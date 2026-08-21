import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

interface Lesson {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    summary: string;
}

const lessons: Lesson[] = [
    { id: 1, title: "Fundamental", duration: "07:57 menit", completed: true, summary: "Fundamental Komputer" },
    { id: 2, title: "Algoritma Komputer", duration: "08:40 menit", completed: true, summary: "Algoritma Dalam Komputer" },
    { id: 3, title: "Pengertian & Sejarah Komputer", duration: "07:41 menit", completed: false, summary: "Apa itu Komputer & Sejarah nya" },
    { id: 4, title: "Keuntungan & Kerugian", duration: "17:20 menit", completed: false, summary: "Keuntungan & Kerugian Sebelum dan Sesudah adanya Komputer" }
];

app.get('/', (req: Request, res: Response) => {
    const lessonId = req.query.lesson ? Number(req.query.lesson) : 1;
    const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

    res.render('index', {
        title: `${currentLesson.title} - Bootcamp Dashboard`,
        lessons,
        currentLesson
    });
});

// Ekspor app untuk Vercel
export default app;

// Jalankan server lokal jika bukan di production
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server Express + TypeScript berjalan di: http://localhost:${PORT}`);
    });
}
