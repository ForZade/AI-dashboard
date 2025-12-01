"use client";

import { COLOR_MAP } from "@/lib/ui/colors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CreateProjectValues } from "./createProject.form";

interface ColorInputProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
}

export function ColorInput<T extends FieldValues>({ label, control, name }: ColorInputProps<T>) {
    return (
        <div className="w-full h-min flex flex-col gap-4">
            <label className="text-foreground/50 font-bold text-sm">
                { label }
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        className="flex flex-row-reverse w-full h-min justify-between"
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        { Object.entries(COLOR_MAP).map(([color, hex]) => (
                            <RadioGroupItem 
                                key={color}
                                value={color}
                                id={color}
                                className="size-6 rounded-md"
                                style={{ backgroundColor: hex }}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </div>
    )
}