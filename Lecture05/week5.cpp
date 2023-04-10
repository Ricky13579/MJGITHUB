#202027042 지명준

#include <iostream>
#include <stdio.h>
#include <conio.h>
#include <Windows.h>
int print_title_screen() {
    printf("********************\n");
    printf("*                  *\n");
    printf("*                  *\n");
    printf("*   지렁이 게임    *\n");
    printf("* 1. 게임 시작     *\n");
    printf("* 2.게임 설명      *\n");
    printf("* 3. 게임 랭킹 보기*\n");
    printf("* 4. 게임종료(esc) *\n");
    printf("********************\n");
    return 0;
}
int print_introduction_screen() {
    printf("********************\n");
    printf("게임 설명 화면입니다\n");
    printf("지금이 어느 시대인데\n");
    printf("타이틀로 갈까요?(Y/N)\n");
    printf("********************\n");
    return 0;
}
void gotoxy(int x, int y) {
    COORD pos = { x,y };
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), pos);
}
int print_game_screen(int screen_width, int screen_height) {

    gotoxy(10, 10);
    

    return 0;
}
int main()
{
    char s = '>>>';
    int x = 0;
    int y = 0;
    int game_state = 0;
    int is_game_running = 1;
    while (is_game_running) {
        char key_input = '0';
        switch (game_state) {
        case 0:
            print_title_screen();
            key_input = _getch();
            if (key_input == '1') {
                game_state = 1;
                break;
            }
            else if (key_input == '2')
            {
                game_state = 2;
                break;
            }
            else if (key_input == '4' || key_input == 27) {
                is_game_running = 0;
                break;
            }
            else
                is_game_running = 0;
        case 1:
            print_game_screen(5, 5);
            while (true) {
                key_input = _getch();
                if (key_input == 'd') {
                    print_game_screen(40, 40);
                    x = x + 1;
                    gotoxy(x, y);
                    printf("%c", s);
                    continue;
                }
                else if (key_input == 'w') {
                    print_game_screen(40, 40);
                    y = y - 1;
                    gotoxy(x, y);
                    printf("%c", s);
                    continue;
                }
                else if (key_input == 'a') {
                    print_game_screen(40, 40);
                    x = x - 1;
                    gotoxy(x, y);
                    printf("%c", s);
                    continue;
                }
                else if (key_input == 's') {
                    print_game_screen(40, 40);
                    y = y + 1;
                    gotoxy(x, y);
                    printf("%c", s);
                    continue;
                }
                else if (key_input == 27) {
                    game_state = 0;
                    break;
                }
                else {
                    is_game_running = 0;
                    break;
                }
            }
            break;
        case 2:
            print_introduction_screen();
            while (true) {
                key_input = _getch();
                if (key_input == 'y') {
                    game_state = 0;
                    break;
                }
                else if (key_input == 'n') {
                    game_state = 2;
                    break;
                }
            }
            break;

        default:
            break;
        }
    }






}
