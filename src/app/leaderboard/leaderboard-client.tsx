"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leaderboardData } from "@/lib/data";
import { ArrowDown, ArrowUp, Minus, Crown } from "lucide-react";

const RankIndicator = ({ rank }: { rank: number }) => {
  if (rank <= 3) {
    const colors: { [key: number]: string } = {
      1: "text-yellow-400",
      2: "text-gray-400",
      3: "text-amber-600",
    };
    return <Crown className={`w-6 h-6 ${colors[rank]}`} />;
  }
  return <span className="font-bold text-lg text-muted-foreground">{rank}</span>;
}

const ChangeIndicator = ({ change }: { change: 'up' | 'down' | 'same' }) => {
    switch (change) {
        case 'up':
            return <ArrowUp className="w-4 h-4 text-green-500" />;
        case 'down':
            return <ArrowDown className="w-4 h-4 text-red-500" />;
        default:
            return <Minus className="w-4 h-4 text-gray-500" />;
    }
}

export function LeaderboardClient() {
  const [topThree, otherRanks] = leaderboardData.reduce<[typeof leaderboardData, typeof leaderboardData]>(
    (acc, user) => {
      (user.rank <= 3 ? acc[0] : acc[1]).push(user);
      return acc;
    },
    [[], []]
  );
  
  return (
    <div className="space-y-8">
      {/* Top 3 as cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {topThree.map((user) => (
           <Card key={user.rank} className="text-center relative overflow-hidden transition-shadow hover:shadow-lg">
             <CardHeader>
                <div className="absolute top-3 right-3">
                    <RankIndicator rank={user.rank} />
                </div>
               <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                 <AvatarImage src={user.avatar} alt={user.name} />
                 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
               </Avatar>
             </CardHeader>
             <CardContent>
               <CardTitle>{user.name}</CardTitle>
               <p className="text-3xl font-bold text-primary mt-2">{user.points.toLocaleString()} pts</p>
             </CardContent>
           </Card>
        ))}
      </div>

      {/* Ranks 4+ as a table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
           <CardDescription>
            Points are awarded for attending sessions, visiting booths, and making connections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Attendee</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="w-[80px] text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {otherRanks.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell className="text-center">
                    <RankIndicator rank={user.rank} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{user.points.toLocaleString()}</TableCell>
                   <TableCell>
                     <div className="flex justify-center">
                        <ChangeIndicator change={user.change as any} />
                     </div>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
