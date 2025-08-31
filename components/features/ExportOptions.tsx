"use client";

import { useState } from "react";
import { Download, FileText, FileImage, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChat } from "@/contexts/ChatContext";
import { exportChatAsJSON } from "@/lib/api";

export function ExportOptions() {
  const { state } = useChat();
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExportJSON = async () => {
    if (!state.activeChat) return;

    setExporting(true);
    try {
      const jsonData = await exportChatAsJSON(state.activeChat);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${state.activeChat.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 2000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!state.activeChat) return;

    setExporting(true);
    try {
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF();

      // Add chat title
      doc.setFontSize(16);
      doc.text(state.activeChat.title, 10, 10);

      // Add chat messages
      doc.setFontSize(12);
      let y = 20;
      state.activeChat.messages.forEach((msg: any, index: number) => {
        const text = `${msg.role.toUpperCase()}: ${msg.content}`;
        const splitText = doc.splitTextToSize(text, 180); // wrap text
        doc.text(splitText, 10, y);
        y += splitText.length * 7;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      // Save file
      doc.save(
        `${state.activeChat.title
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}.pdf`
      );

      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 2000);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  if (!state.activeChat) {
    return (
      <Button variant="outline" disabled className="w-full">
        <Download className="h-4 w-4 mr-2" />
        No chat to export
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-200"
          disabled={exporting}
        >
          {exportComplete ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Exported!
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              {exporting ? "Exporting..." : "Export Chat"}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <DropdownMenuItem onClick={handleExportJSON} disabled={exporting}>
          <FileText className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleExportPDF} disabled={exporting}>
          <FileImage className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
