#include <stdio.h>
#include <windows.h>
#include <stdlib.h>
#include "screen.h"
#include "Snake.h"
#include "KeyBoard.h"

void InputMainScreen()
{
    char input = _getch();
    if (_kbhit())
    {
        switch (input)
        {
        case '1':
            gameRunning = true;
            DrawGameScreen();
        case '2':
            gameRunning = false;
            break;
        default:
            DrawMainScreen();
        }
    }
}

void InputGameScreen() 
{
    if (kbhit())
    {
        char input = _getch();
        switch (input)
        {
        case 'a':
            dir = LEFT;
            break;
        case 'd':
            dir = RIGHT;
            break;
        case 'w':
            dir = UP;
            break;
        case 's':
            dir = DOWN;
            break;
        case 'x':
            gameOver = true;
            DrawGameOverScreen();
            break;
        }
    }
}

void InputGameOverScreen()
{
    char input = _getch();
    if (_kbhit()) 
    {
        switch (input)
        {
        case 'y':
            gameRunning = false;
            DrawGameScreen();
        case 'n':
            gameOver = true;
            DrawMainScreen();
        default:
            gameOver = true;
            exit(0);
            break;
        }
    }
}

