import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Bài 10
export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const jsonData = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(jsonData);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi đọc dữ liệu' }, { status: 500 });
    }
}

// Bài 9
export async function POST(request: any) {
    console.log("Yêu cầu POST đã được gọi");
    try {
        const newProduct = await request.json();
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const jsonData = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(jsonData);
        products.push(newProduct);
        await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
        return NextResponse.json({ message: 'Sản phẩm đã được thêm thành công' });
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        return NextResponse.json({ message: 'Lỗi khi thêm sản phẩm' }, { status: 500 });
    }
}