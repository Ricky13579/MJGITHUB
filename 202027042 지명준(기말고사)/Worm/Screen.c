#include <stdio.h>
#include <windows.h>
#include "screen.h"
#include "Snake.h"
#include "KeyBoard.h"

void SetCursorState(bool visible)//커서 깜빡임 방지
{
    CONSOLE_CURSOR_INFO consoleCursorInfo;
    consoleCursorInfo.bVisible = visible;
    consoleCursorInfo.dwSize = 1;
    SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE), &consoleCursorInfo);
}
void SetColor(int color) //색깔 지정함수
{
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}
void DrawMainScreen()
{
    system("cls");
    SetColor(5);
    printf("Welcome to Snake Game!\n");
    printf("1. Start Game\n");
    printf("2. Quit Game\n");
    InputMainScreen();
}

void DrawGameScreen()
{
    system("cls");
    SetColor(7);
    SetCursorState(false);
    for (int i = 0; i < WIDTH + 2; i++)
        printf("#");
    printf("\n");

    for (int i = 0; i < HEIGHT; i++)
    {
        for (int j = 0; j < WIDTH; j++)
        {
            if (j == 0)
                printf("#");

            bool isTail = false;
            for (int k = 0; k < nTail; k++)
            {
                if (tailX[k] == j && tailY[k] == i)
                {
                    if (k == 0)
                        printf("Q"); // 머리 모양
                    else
                        printf("o"); // 꼬리 모양
                    isTail = true;
                }
            }

            if (!isTail)
            {
                if (i == fruitY && j == fruitX)
                    printf("F"); // 먹이 모양
                else
                    printf(" ");
            }

            if (j == WIDTH - 1)
                printf("#");
        }
        printf("\n");
    }
    for (int i = 0; i < WIDTH + 2; i++)
        printf("#");
    printf("\n");
    printf("Score: %d\n", score);
}

void DrawGameOverScreen()
{
    system("cls");
    SetColor(14);
        printf("Game Over!\n");
        printf("Your Score: %d\n", score);
        printf("Continue? (Y/N)");
        InputGameOverScreen();
}