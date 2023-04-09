#include <iostream>
#include <stdio.h>
#include <conio.h>
#include <windows.h>
int print_title_screen() {
    cout::std<<"***********************"<<cout::endl;
    cout::std<<"*                      *"<<cout::endl;
    cout::std<<"*                      *"<<cout::endl;
   cout::std<<"*         지렁이 게임      *"<<cout::endl;
    cout::std<<"*         1. 게임 시작    *"<<cout::endl;
   cout::std<<"*         2. 게임 설명    *"<<cout::endl;
   cout::std<<"*        3. 게임 랭킹 보기     *"<<cout::endl;
   cout::std<<"*         게임 종료(esc)      *"<<cout::endl;
    cout::std<<"***********************"<<cout::endl;
    return 0;
}
int print_introduction_screen() {
    cout::std<<"***********************"<<cout::endl;
     cout::std<<"게임 설명 화면입니다"<<cout::endl;
    cout::std<<"지금이 어느 시대인데"<<cout::endl;
     cout::std<<"타이틀로 갈까요(Y/N)"<<cout::endl;
    cout::std<<"***********************"<<cout::endl;
    return 0;
}
void gotoxy(int x, int y) {
    COORD pos = { x,y };
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),pos);
}
int print_game_screen(int screen_width,int screen_height) {
   
    gotoxy(10,10);
 std::cout<<">>";

    return 0;
}
int main()
{
   
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
            is_game_running=0;
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
                    y = y -1;
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
                    game_state=0;
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
                    else if(key_input=='n') {
                        game_state = 2;
                        break;
                    }
                }
                break;
                        
            default :
                break;
            }
        }
           


               


}
