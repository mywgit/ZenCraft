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
  clearBeads: () => void;
  loadPreset: (presetName: "grounding" | "wealth" | "shield" | "wisdom") => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const DEFAULT_PRESET_BEADS: SelectedBead[] = [
  { id: "b-0", materialId: "silver-lotus", sizeMm: 12 }, // Guru Centerpiece
  { id: "b-1", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-2", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-3", materialId: "natural-turquoise", sizeMm: 10 },
  { id: "b-4", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-5", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-6", materialId: "brass-ring", sizeMm: 6 },
  { id: "b-7", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-8", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-9", materialId: "gold-phoebe", sizeMm: 10 },
  { id: "b-10", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-11", materialId: "green-sandalwood", sizeMm: 10 },
  { id: "b-12", materialId: "brass-ring", sizeMm: 6 },
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
  const [selectedSizeMm, setSelectedSizeMm] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>("wood");
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("Mindful Seeker");

  const [energyResult, setEnergyResult] = useState<EnergyAnalysisResult>(() =>
    calculateEnergyProfile(DEFAULT_PRESET_BEADS)
  );

  useEffect(() => {
    setEnergyResult(calculateEnergyProfile(beads));
  }, [beads]);

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

  const clearBeads = () => {
    setBeads([]);
    setActiveBeadIndex(null);
  };

  const loadPreset = (presetName: "grounding" | "wealth" | "shield" | "wisdom") => {
    if (presetName === "grounding") {
      setBeads(DEFAULT_PRESET_BEADS);
    } else if (presetName === "wealth") {
      setBeads([
        { id: "b-0", materialId: "pixiu-charm", sizeMm: 12 },
        { id: "b-1", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-2", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-3", materialId: "tigers-eye", sizeMm: 10 },
        { id: "b-4", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-5", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-6", materialId: "brass-ring", sizeMm: 6 },
        { id: "b-7", materialId: "tigers-eye", sizeMm: 10 },
        { id: "b-8", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-9", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-10", materialId: "brass-ring", sizeMm: 6 },
        { id: "b-11", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-12", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-13", materialId: "tigers-eye", sizeMm: 10 },
        { id: "b-14", materialId: "gold-phoebe", sizeMm: 10 },
        { id: "b-15", materialId: "gold-phoebe", sizeMm: 10 },
      ]);
    } else if (presetName === "shield") {
      setBeads([
        { id: "b-0", materialId: "peach-wood", sizeMm: 12 },
        { id: "b-1", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-2", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-3", materialId: "black-obsidian", sizeMm: 10 },
        { id: "b-4", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-5", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-6", materialId: "om-mantra", sizeMm: 8 },
        { id: "b-7", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-8", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-9", materialId: "black-obsidian", sizeMm: 10 },
        { id: "b-10", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-11", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-12", materialId: "om-mantra", sizeMm: 8 },
        { id: "b-13", materialId: "ebony-wood", sizeMm: 10 },
        { id: "b-14", materialId: "ebony-wood", sizeMm: 10 },
      ]);
    } else if (presetName === "wisdom") {
      setBeads([
        { id: "b-0", materialId: "silver-lotus", sizeMm: 12 },
        { id: "b-1", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-2", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-3", materialId: "amethyst", sizeMm: 10 },
        { id: "b-4", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-5", materialId: "lapis-lazuli", sizeMm: 10 },
        { id: "b-6", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-7", materialId: "hetian-jade", sizeMm: 10 },
        { id: "b-8", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-9", materialId: "lapis-lazuli", sizeMm: 10 },
        { id: "b-10", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-11", materialId: "amethyst", sizeMm: 10 },
        { id: "b-12", materialId: "thuja-cypress", sizeMm: 10 },
        { id: "b-13", materialId: "thuja-cypress", sizeMm: 10 },
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
