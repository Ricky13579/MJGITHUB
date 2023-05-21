#include "gameloop.hpp";
#include <conio.h>
#include <Windows.h>

int main()
{
    using namespace MuSoeun;
    int gameplaying = 1;
    Scene scene(80,30);

    SnakeBody snakeBody(10,10);
    
    scene.AddObject(&snakeBody);

    while (gameplaying)
    {
        scene.Draw();

        if (_getch() == 27) {
            gameplaying = 0;
        }

    }

    return 0;
}