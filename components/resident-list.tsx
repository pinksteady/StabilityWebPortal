"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { ResidentProfile } from "./resident-profile"
import { allResidents, type Resident } from "@/lib/data"
import ErrorBoundary from "./error-boundary"

export function ResidentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null)

  const filteredResidents = allResidents.filter(
    (resident) => resident.name.toLowerCase().includes(searchTerm.toLowerCase()) || resident.room.includes(searchTerm),
  )

  return (
    <ErrorBoundary>
      <div>
        <Input
          placeholder="Search by name or room number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        {filteredResidents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Stability Score</TableHead>
                <TableHead>Pink Noise Usage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.room}</TableCell>
                  <TableCell>{resident.stabilityScore?.toFixed(1) ?? "N/A"}</TableCell>
                  <TableCell>{resident.pinkNoiseUsage}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedResident(resident)}>
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-y-auto">
                        <DialogDescription className="sr-only">
                          Detailed profile information for the selected resident
                        </DialogDescription>
                        {selectedResident && <ResidentProfile initialResident={selectedResident} />}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No residents found.</p>
        )}
      </div>
    </ErrorBoundary>
  )
}

