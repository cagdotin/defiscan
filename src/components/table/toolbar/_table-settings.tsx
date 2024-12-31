import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableSettingsProps {
  className?: string;
}

const settings = [
  {
    name: "Group Chains by Project",
    key: "group-chains",
    selected: true,
  },
];

// #is/feature/idea
// TODO: integrate the table settings into the table

export function DataTableSettings({ className }: DataTableSettingsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="h-12 w-12 shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 mr-[-1px] -mt-1" align="end">
        <Command>
          <CommandList>
            <CommandGroup>
              {settings.map((s) => (
                <CommandItem
                  key={s.key}
                  onSelect={() => {
                    console.log(`toggle:table-setting::${s.key}`);
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center border border-primary",
                      s.selected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check />
                  </div>
                  <span className="text-xs font-mono">{s.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
