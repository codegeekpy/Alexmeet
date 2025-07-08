
"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getNextAction, Message } from '@/ai/flows/real-time-ai-assistant';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function RealTimeAIAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hi there! How can I help you navigate the event today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleActionRequest = async () => {
    if (!query.trim()) return;

    const currentQuery = query;
    const currentMessages = messages;

    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: currentQuery }]);
    setIsLoading(true);

    try {
      const result = await getNextAction({ query: currentQuery, history: currentMessages });
      setMessages(prev => [...prev, { role: 'model', content: result.suggestion }]);
    } catch (error) {
      console.error(error);
      const errorMessage = 'Sorry, I had trouble getting a suggestion. Please try again.';
      setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
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
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Real-Time AI Assistant
        </h3>
        <p className="text-sm text-muted-foreground">
          Ask me for suggestions on what to do next at the event.
        </p>
      </div>
      <div className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow p-6">
            <div className="space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                        {message.role === 'model' && (
                            <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                                <AvatarFallback><Bot size={18} /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("p-3 rounded-lg max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="w-8 h-8 border">
                                <AvatarFallback><User size={18} /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                         <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg bg-secondary flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
        <div className="flex gap-2 p-4 border-t bg-background">
          <Input
            placeholder="e.g., Who should I network with about SaaS?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    handleActionRequest();
                }
            }}
            disabled={isLoading}
          />
          <Button onClick={handleActionRequest} disabled={isLoading || !query.trim()} size="icon">
             <Send />
             <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
