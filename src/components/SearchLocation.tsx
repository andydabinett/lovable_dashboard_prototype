
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface SearchLocationProps {
  onSearch: (location: string) => void;
  className?: string;
}

export function SearchLocation({ onSearch, className }: SearchLocationProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    if (query.trim().length < 2) {
      toast({
        title: "Please enter a valid location",
        description: "Location should be at least 2 characters long",
        variant: "destructive",
      });
      return;
    }
    onSearch(query.trim());
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div 
      className={cn(
        "relative transition-all duration-300 rounded-full",
        isFocused 
          ? "w-full md:w-full bg-background border shadow-sm" 
          : "w-full md:w-64 bg-background/50 border border-transparent hover:bg-background/70 hover:border-border",
        className
      )}
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          type="submit"
          className="h-10 w-10 rounded-full text-muted-foreground"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        />
        {query && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full text-muted-foreground"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
