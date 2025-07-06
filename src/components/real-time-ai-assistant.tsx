"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getNextAction } from '@/ai/flows/real-time-ai-assistant';
import { Bot, Loader2 } from 'lucide-react';

export function RealTimeAIAssistant() {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleActionRequest = async () => {
    if (!query) {
      toast({
        title: 'Input Required',
        description: 'Please tell me what you\'re looking for.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSuggestion('');
    try {
      const result = await getNextAction({ query });
      setSuggestion(result.suggestion);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not get a suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Real-Time AI Assistant
        </CardTitle>
        <CardDescription>
          Ask for suggestions on what to do next at the event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., I'm interested in AI startups"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleActionRequest()}
            disabled={isLoading}
          />
          <Button onClick={handleActionRequest} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Ask'}
          </Button>
        </div>
        {suggestion && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="font-semibold">Suggestion:</p>
            <p className="text-muted-foreground">{suggestion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
