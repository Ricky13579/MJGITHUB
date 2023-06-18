#include <stdio.h>
#include <conio.h>
#include <windows.h>
#include "Snake.h"
#include "screen.h"
#include "KeyBoard.h"

bool gameOver;
bool gameRunning;
int x, y, fruitX, fruitY, score;
int tailX[100], tailY[100];
int nTail;
enum eDirection dir;
unsigned long lastMoveTime;
unsigned long deltaTime;

void Setup()
{
    gameOver = false;
    dir = STOP;
    x = WIDTH / 2;
    y = HEIGHT / 2;
    fruitX = rand() % WIDTH;
    fruitY = rand() % HEIGHT;
    score = 0;
    nTail = 2;
    DrawMainScreen();

    // 꼬리 초기 위치 설정
    for (int i = 0; i < nTail; i++)
    {
        tailX[i] = x;
        tailY[i] = y + i + 1;
    }
}

void Logic()
{
    int prevX = tailX[0];
    int prevY = tailY[0];
    int prev2X, prev2Y;
    tailX[0] = x;
    tailY[0] = y;
    for (int i = 1; i < nTail; i++)
    {
        prev2X = tailX[i];
        prev2Y = tailY[i];
        tailX[i] = prevX;
        tailY[i] = prevY;
        prevX = prev2X;
        prevY = prev2Y;
    }
    
    switch (dir)
    {
    case LEFT:
        x--;
        break;
    case RIGHT:
        x++;
        break;
    case UP:
        y--;
        break;
    case DOWN:
        y++;
        break;
    }

    if (x >= WIDTH)
        x = 0;
    else if (x < 0)
        x = WIDTH - 1;

    if (y >= HEIGHT)
        y = 0;
    else if (y < 0)
        y = HEIGHT - 1;

    for (int i = 1; i < nTail; i++) // 머리와 꼬리가 겹치는지 확인
    {
        if (tailX[i] == x && tailY[i] == y)
        {
            gameOver = true;
            DrawGameOverScreen();
            InputGameOverScreen();
        }
    }

    if (x == fruitX && y == fruitY)
    {
        score += 10;
        fruitX = rand() % WIDTH;
        fruitY = rand() % HEIGHT;
        nTail++;
        if (score > 110)
        {
            gameOver = true;
            DrawGameOverScreen();
            InputGameOverScreen();
        }
    }
}

void RunGame()
{
    while (!gameRunning)
    {
        unsigned long currentTime = GetTickCount64();
        deltaTime = currentTime - lastMoveTime;
        if (deltaTime >= MOVE_INTERVAL)
        {
            lastMoveTime = currentTime;

            InputGameScreen();
            Logic();
            DrawGameScreen();
        }
    }
    DrawGameOverScreen();
    InputGameOverScreen();
}


int main()
{
    srand(time(NULL));
    while (!gameRunning) 
    {
        DrawMainScreen();
        InputMainScreen();
        while (!gameRunning)
        {
            DrawGameScreen();
            RunGame();
        }
    }
    return 0;
    
}
