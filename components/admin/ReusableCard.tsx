import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { ArrowDownToLine } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ReusableCardProps {
    title: string;
    valueOfCard: string;
    progress: number;
    data?: any[];
}

const ReusableCard = ({ title, progress, valueOfCard, data }: ReusableCardProps) => {
    console.log(data, "reusable card");

    const flattenObject = (obj: any, parent: string = '', res: any = {}) => {
        for (let key in obj) {
            const propName = parent ? `${parent}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flattenObject(obj[key], propName, res);
            } else {
                res[propName] = obj[key];
            }
        }
        return res;
    };

    const generatePDF = () => {
        const doc = new jsPDF('landscape'); // Set orientation to landscape
        const excludeFields = ['password', '__v','items.0.imageUrl','items 0 _id','items.0.created_at','items.0.updated_at','items.0.__v','items.0.imageSrc','createdAt','updatedAt']; 

        if (data && data.length > 0) {
            const flattenedData = data.map(item => flattenObject(item));
            const columns = Object.keys(flattenedData[0])
                .filter(key => !excludeFields.includes(key))
                .map(key => ({ header: key.replace(/\./g, ' '), dataKey: key }));
            const rows = flattenedData.map(item => 
                Object.keys(item)
                    .filter(key => !excludeFields.includes(key))
                    .reduce((acc, key) => {
                        acc[key] = item[key];
                        return acc;
                    }, {})
            );

            doc.autoTable({
                head: [columns.map(col => col.header)],
                body: rows.map(row => columns.map(col => row[col.dataKey])),
                styles: { cellPadding: 3, fontSize: 10 },
                columnStyles: {
                    0: { cellWidth: 'auto' }, // Adjust the width of the first column
                    1: { cellWidth: 'auto' }, // Adjust the width of the second column
                    
                },
                didDrawCell: (data) => {
                    if (data.column.dataKey === 'someColumnKey') {
                    }
                },
            });
        } else {
            doc.text("No data available", 10, 10);
        }

        doc.save(`${title}.pdf`);
    };

    return (
        <Card>
            <CardHeader className='pb-2'>
                <CardDescription className="flex justify-between">
                    <span>{title}</span>
                    <span className="cursor-pointer" onClick={generatePDF}><ArrowDownToLine /></span>
                </CardDescription>
                <CardTitle className='text-4xl'>{valueOfCard}</CardTitle>
            </CardHeader>
            {/* <CardFooter>
                <Progress value={progress} aria-label='15% increase' />
            </CardFooter> */}
        </Card>
    );
};

export default ReusableCard;