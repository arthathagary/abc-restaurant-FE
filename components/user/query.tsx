import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Query() {
  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Have a question or feedback? Fill out the form below and we'll get
          back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='subject'>Subject</Label>
            <Select id='subject'>
              <SelectTrigger>
                <SelectValue placeholder='Select subject' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='reservation'>Reservation</SelectItem>
                <SelectItem value='menu'>Menu</SelectItem>
                <SelectItem value='feedback'>Feedback</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              id='message'
              placeholder='Enter your message'
              className='min-h-[150px]'
            />
          </div>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className='space-y-4'>
          <Separator />
          <div className='space-y-2'>
            <h3 className='text-lg font-medium'>Response</h3>
            <div className='prose text-muted-foreground'>
              <p>
                Thank you for your message. We will review your inquiry and get
                back to you as soon as possible. In the meantime, please check
                our website for the latest updates on our menu, reservations,
                and other information.
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
