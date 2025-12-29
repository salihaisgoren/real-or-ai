import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultScreen from '../components/ResultScreen';

describe('ResultScreen Bileşeni Testleri', () => {

    it('Doğru cevap verildiğinde "Tebrikler!" başlığı görünmeli', () => {
        render(
            <ResultScreen
                isCorrect={true}
                onPlayAgain={() => {}}
            />
        );

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/Tebrikler!/i);

        expect(screen.getByText(/Yapay zeka tarafından oluşturulan görseli buldun!/i)).toBeInTheDocument();
    });

    it('Yanlış cevap verildiğinde "Yanlış Tahmin!" başlığı görünmeli', () => {
        render(
            <ResultScreen
                isCorrect={false}
                onPlayAgain={() => {}}
            />
        );

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/Yanlış Tahmin!/i);

        expect(screen.getByText(/Maalesef, doğru cevabı bulamadın!/i)).toBeInTheDocument();
    });

    it('Tekrar Oyna butonuna basınca fonksiyon çalışmalı', () => {
        const mockPlayAgain = vi.fn();

        render(
            <ResultScreen
                isCorrect={true}
                onPlayAgain={mockPlayAgain}
            />
        );

        const button = screen.getByRole('button', { name: /Tekrar Oyna/i });

        fireEvent.click(button);

        expect(mockPlayAgain).toHaveBeenCalledTimes(1);
    });
});