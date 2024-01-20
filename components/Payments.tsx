/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w67dUWRlyWJ
 */
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Payment() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
      <div className="p-4 sm:p-6 md:p-8 bg-white shadow rounded-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8">Choose your payment option</h1>
        <div className="space-y-4">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>$5 Payment Option</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This payment options gives your 3K QR Code Generations.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select</Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>$10 Payment Option</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This payment option gives you 10K QR Code Generations. 
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

