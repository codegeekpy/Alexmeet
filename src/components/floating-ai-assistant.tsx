
"use client";

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RealTimeAIAssistant } from '@/components/real-time-ai-assistant';
import { Bot } from 'lucide-react';

export function FloatingAIAssistant() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-40"
          size="icon"
        >
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0" side="right">
          <RealTimeAIAssistant />
      </SheetContent>
    </Sheet>
  );
}
