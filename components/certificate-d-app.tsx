'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Upload, Wallet } from 'lucide-react'

import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export function CertificateDApp() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | boolean>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleWalletConnection = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  const handleCertificateIssuance = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Certificate issued")
  }

  const handleCertificateVerification = (e: React.FormEvent) => {
    e.preventDefault()
    setVerificationResult(Math.random() > 0.5)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">CertifyZ</h1>
        </div>
      </nav>
      <div className="container mx-auto p-6 max-w-3xl flex-grow">
        <Card className="w-full">
          <CardHeader className="space-y-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Certificate Verification</CardTitle>
              <Button onClick={handleWalletConnection} variant={isWalletConnected ? "outline" : "default"}>
                <Wallet className="mr-2 h-4 w-4" />
                {isWalletConnected ? "Disconnect Wallet" : "Connect Wallet"}
              </Button>
            </div>
            <CardDescription className="text-lg">Issue and verify certificates on the Aptos blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Issue Certificate</h2>
              <form onSubmit={handleCertificateIssuance} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientAddress" className="text-sm">Recipient's Aptos Address</Label>
                    <Input id="recipientAddress" placeholder="Enter recipient's Aptos address" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificateFile" className="text-sm">Upload Certificate</Label>
                    <div className="flex items-center space-x-4">
                      <Input id="certificateFile" type="file" className="hidden" onChange={handleFileChange} />
                      <Button asChild variant="outline">
                        <label htmlFor="certificateFile" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </label>
                      </Button>
                      <span className="text-sm text-gray-500">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={!isWalletConnected}>
                  Issue Certificate
                </Button>
              </form>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Verify Certificate</h2>
              <form onSubmit={handleCertificateVerification} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verifyAddress" className="text-sm">Recipient's Aptos Address</Label>
                    <Input id="verifyAddress" placeholder="Enter recipient's Aptos address" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ipfsHash" className="text-sm">IPFS Hash</Label>
                    <Input id="ipfsHash" placeholder="Enter IPFS hash of the certificate" className="h-10" />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={!isWalletConnected}>
                  Verify Certificate
                </Button>
              </form>
              {verificationResult !== null && (
                <div className={`p-4 rounded-md ${verificationResult ? 'bg-green-100' : 'bg-red-100'}`}>
                  {verificationResult ? (
                    <div className="flex items-center text-green-700">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Certificate is valid
                    </div>
                  ) : (
                    <div className="flex items-center text-red-700">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Certificate is not valid
                    </div>
                  )}
                </div>
              )}
            </section>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Powered by Aptos blockchain and IPFS
          </CardFooter>
        </Card>
      </div>
      <footer className="mt-6 py-4 bg-black text-white text-center">
        <span className={`${openSans.className} text-sm`}>
          Made by Suparnojit Sarkar
        </span>
      </footer>
    </div>
  )
}