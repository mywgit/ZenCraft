"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SelectedBead, calculateEnergyProfile, EnergyAnalysisResult } from "@/lib/energyCalculator";
import { MaterialCategory } from "@/lib/materialsData";

interface StudioContextType {
  beads: SelectedBead[];
  activeBeadIndex: number | null;
  patinaLevel: number; // 0 = raw, 1 = 1y, 2 = 5y, 3 = 10y
  wristSizeCm: number;
  selectedSizeMm: number;
  selectedCategory: MaterialCategory;
  isCertificateOpen: boolean;
  customerName: string;
  energyResult: EnergyAnalysisResult;
  setActiveBeadIndex: (index: number | null) => void;
  setPatinaLevel: (level: number) => void;
  setWristSizeCm: (size: number) => void;
  setSelectedSizeMm: (size: number) => void;
  setSelectedCategory: (cat: MaterialCategory) => void;
  setIsCertificateOpen: (open: boolean) => void;
  setCustomerName: (name: string) => void;
  addBead: (materialId: string, sizeMm?: number) => void;
  replaceBead: (index: number, materialId: string) => void;
  removeBead: (index: number) => void;
  moveBead: (fromIndex: number, direction: "left" | "right") => void;
  reorderBeads: (fromIndex: number, toIndex: number) => void;
  clearBeads: () => void;
  loadPreset: (presetName: "grounding" | "wealth" | "shield" | "wisdom") => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

// 18 Uniform 10mm Beads (Classic Standard Mala)
const DEFAULT_PRESET_BEADS: SelectedBead[] = [
  { id: "b-0", materialId: "silver-lotus", sizeMm: 10 }, // Guru Centerpiece
  { id: "b-1", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-2", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-3", materialId: "natural-turquoise", sizeMm: 10 },
  { id: "b-4", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-5", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-6", materialId: "brass-ring", sizeMm: 10 },
  { id: "b-7", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-8", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-9", materialId: "gold-phoebe", sizeMm: 10 },
  { id: "b-10", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-11", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-12", materialId: "brass-ring", sizeMm: 10 },
  { id: "b-13", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-14", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-15", materialId: "natural-turquoise", sizeMm: 10 },
  { id: "b-16", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-17", materialId: "green-sandalwood", sizeMm: 10 },
];

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [beads, setBeads] = useState<SelectedBead[]>(DEFAULT_PRESET_BEADS);
  const [activeBeadIndex, setActiveBeadIndex] = useState<number | null>(0);
  const [patinaLevel, setPatinaLevel] = useState<number>(1); // Default to 1-yr touch
  const [wristSizeCm, setWristSizeCm] = useState<number>(16);
  const [selectedSizeMm, setSelectedSizeMmState] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>("wood");
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("Mindful Seeker");

  const [energyResult, setEnergyResult] = useState<EnergyAnalysisResult>(() =>
    calculateEnergyProfile(DEFAULT_PRESET_BEADS)
  );

  useEffect(() => {
    setEnergyResult(calculateEnergyProfile(beads));
  }, [beads]);

  // When user picks a new size (6/8/10/12/15/18mm), synchronize all beads uniformly
  const setSelectedSizeMm = (size: number) => {
    setSelectedSizeMmState(size);
    setBeads((prev) => prev.map((b) => ({ ...b, sizeMm: size })));
  };

  const addBead = (materialId: string, sizeMm?: number) => {
    const newBead: SelectedBead = {
      id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      materialId,
      sizeMm: sizeMm || selectedSizeMm,
    };
    if (activeBeadIndex !== null && activeBeadIndex < beads.length) {
      // Insert right after active bead
      const newArr = [...beads];
      newArr.splice(activeBeadIndex + 1, 0, newBead);
      setBeads(newArr);
      setActiveBeadIndex(activeBeadIndex + 1);
    } else {
      setBeads([...beads, newBead]);
      setActiveBeadIndex(beads.length);
    }
  };

  const replaceBead = (index: number, materialId: string) => {
    if (index >= 0 && index < beads.length) {
      const newArr = [...beads];
      newArr[index] = {
        ...newArr[index],
        materialId,
        sizeMm: selectedSizeMm,
      };
      setBeads(newArr);
    }
  };

  const removeBead = (index: number) => {
    if (index >= 0 && index < beads.length) {
      const newArr = beads.filter((_, i) => i !== index);
      setBeads(newArr);
      setActiveBeadIndex(newArr.length > 0 ? Math.min(index, newArr.length - 1) : null);
    }
  };

  const moveBead = (fromIndex: number, direction: "left" | "right") => {
    if (beads.length <= 1) return;
    const toIndex =
      direction === "left"
        ? (fromIndex - 1 + beads.length) % beads.length
        : (fromIndex + 1) % beads.length;

    const newArr = [...beads];
    const temp = newArr[fromIndex];
    newArr[fromIndex] = newArr[toIndex];
    newArr[toIndex] = temp;

    setBeads(newArr);
    setActiveBeadIndex(toIndex);
  };

  const reorderBeads = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || fromIndex >= beads.length || toIndex < 0 || toIndex >= beads.length) {
      return;
    }
    const newArr = [...beads];
    const [movedItem] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, movedItem);
    setBeads(newArr);
    setActiveBeadIndex(toIndex);
  };

  const clearBeads = () => {
    setBeads([]);
    setActiveBeadIndex(null);
  };

  const loadPreset = (presetName: "grounding" | "wealth" | "shield" | "wisdom") => {
    if (presetName === "grounding") {
      setBeads(DEFAULT_PRESET_BEADS.map((b) => ({ ...b, sizeMm: selectedSizeMm })));
    } else if (presetName === "wealth") {
      setBeads([
        { id: "b-0", materialId: "pixiu-charm", sizeMm: selectedSizeMm },
        { id: "b-1", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-2", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-3", materialId: "tigers-eye", sizeMm: selectedSizeMm },
        { id: "b-4", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-5", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-6", materialId: "brass-ring", sizeMm: selectedSizeMm },
        { id: "b-7", materialId: "tigers-eye", sizeMm: selectedSizeMm },
        { id: "b-8", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-9", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-10", materialId: "brass-ring", sizeMm: selectedSizeMm },
        { id: "b-11", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-12", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-13", materialId: "tigers-eye", sizeMm: selectedSizeMm },
        { id: "b-14", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
        { id: "b-15", materialId: "gold-phoebe", sizeMm: selectedSizeMm },
      ]);
    } else if (presetName === "shield") {
      setBeads([
        { id: "b-0", materialId: "peach-wood", sizeMm: selectedSizeMm },
        { id: "b-1", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-2", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-3", materialId: "black-obsidian", sizeMm: selectedSizeMm },
        { id: "b-4", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-5", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-6", materialId: "om-mantra", sizeMm: selectedSizeMm },
        { id: "b-7", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-8", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-9", materialId: "black-obsidian", sizeMm: selectedSizeMm },
        { id: "b-10", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-11", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-12", materialId: "om-mantra", sizeMm: selectedSizeMm },
        { id: "b-13", materialId: "ebony-wood", sizeMm: selectedSizeMm },
        { id: "b-14", materialId: "ebony-wood", sizeMm: selectedSizeMm },
      ]);
    } else if (presetName === "wisdom") {
      setBeads([
        { id: "b-0", materialId: "silver-lotus", sizeMm: selectedSizeMm },
        { id: "b-1", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-2", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-3", materialId: "amethyst", sizeMm: selectedSizeMm },
        { id: "b-4", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-5", materialId: "lapis-lazuli", sizeMm: selectedSizeMm },
        { id: "b-6", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-7", materialId: "hetian-jade", sizeMm: selectedSizeMm },
        { id: "b-8", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-9", materialId: "lapis-lazuli", sizeMm: selectedSizeMm },
        { id: "b-10", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-11", materialId: "amethyst", sizeMm: selectedSizeMm },
        { id: "b-12", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
        { id: "b-13", materialId: "thuja-cypress", sizeMm: selectedSizeMm },
      ]);
    }
    setActiveBeadIndex(0);
  };

  return (
    <StudioContext.Provider
      value={{
        beads,
        activeBeadIndex,
        patinaLevel,
        wristSizeCm,
        selectedSizeMm,
        selectedCategory,
        isCertificateOpen,
        customerName,
        energyResult,
        setActiveBeadIndex,
        setPatinaLevel,
        setWristSizeCm,
        setSelectedSizeMm,
        setSelectedCategory,
        setIsCertificateOpen,
        setCustomerName,
        addBead,
        replaceBead,
        removeBead,
        moveBead,
        reorderBeads,
        clearBeads,
        loadPreset,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
