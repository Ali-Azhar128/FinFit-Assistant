import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const FinancialLogs = ({ financeLogs }) => {
  return (
    <Card className="w-[90%]">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Financial Logs</CardTitle>
          <CardDescription>Recent financial transactions.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{log.item}</div>
                </TableCell>
                <TableCell className="text-right">${log.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FinancialLogs;