#pragma once
#ifndef SCREEN_H
#define SCREEN_H
#include <stdbool.h>
void DrawMainScreen();
void DrawGameScreen();
void DrawGameOverScreen();
void SetCursorState(bool visible);
void SetColor(int color);

#endif
