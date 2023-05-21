#include <iostream>
#include <vector>


namespace MuSoeun
{
    class Object
    {
    public:
        virtual void Render(char* screenBuf, int screenWidth) = 0;
    };

    class Scene
    {
    public:
        int width;
        int height;
        std::vector<Object*> objList;
        char* screenBuf;

    public:
        Scene(int screenWidth, int screenHeight) : width(screenWidth), height(screenHeight)
        {
            screenBuf = new char[(width + 1) * height];
            InitScreenBuf();
        }

        ~Scene()
        {
            delete[] screenBuf;
        }

        void AddObject(Object* obj)
        {
            objList.push_back(obj);
        }

        void Draw()
        {
            ClearScreenBuf();
            for (Object* obj : objList)
            {
                obj->Render(screenBuf, width);
            }
            DrawScreenBuf();
        }

    private:
        void InitScreenBuf()
        {
            for (int i = 0; i < height; i++)
            {
                screenBuf[(width + 1) * i + width] = '\n';
            }
            screenBuf[(width + 1) * (height - 1) + width] = '\0';
        }

        void ClearScreenBuf()
        {
            for (int i = 0; i < (width + 1) * height; i++)
            {
                screenBuf[i] = ' ';
            }
        }

        void DrawScreenBuf()
        {
            system("cls");
            std::cout << screenBuf;
        }
    };

    class SnakeBody : public Object
    {
    private:
        int x;
        int y;

    public:
        SnakeBody(int posX, int posY) : x(posX), y(posY) {}

        void Render(char* screenBuf, int screenWidth) override
        {
            screenBuf[y * (screenWidth + 1) + x] = '@';
        }
    };

    class Component
    {
    public:
        virtual void Start() = 0;
        virtual void Update() = 0;
    };
}

