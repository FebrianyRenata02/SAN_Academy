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
    { id: 1, title: "Fundamental", duration: "07:57 menit", completed: true, summary: "Apa itu Komputer" },
    { id: 2, title: "Menggunakan JQuery Selector", duration: "08:40 menit", completed: true, summary: "Cara menggunakan selector tag, id, dan class untuk memilih elemen HTML dengan cepat." },
    { id: 3, title: "Bekerja dengan DOM di JQuery", duration: "07:41 menit", completed: false, summary: "Mempelajari cara membaca dan mengubah konten teks maupun HTML di dalam elemen." },
    { id: 4, title: "Memanipulasi DOM di JQuery", duration: "17:20 menit", completed: false, summary: "Praktik langsung menambah, menghapus, dan memodifikasi atribut elemen web." }
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
