#pragma once
#include <stdbool.h>
#include <Windows.h>

#define WIDTH 20
#define HEIGHT 20
#define MOVE_INTERVAL 200

enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };

extern bool gameOver;
extern bool gameRunning;
extern int x, y, fruitX, fruitY, score;
extern int tailX[100], tailY[100];
extern int nTail;
extern enum eDirection dir;
extern unsigned long lastMoveTime;
extern unsigned long deltaTime;

void Setup();
void Logic();
void RunGame();

