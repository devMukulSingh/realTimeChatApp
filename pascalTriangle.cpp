#include <iostream>
using namespace std;

// 1
// 1 1
// 1 2 1
// 1 3 3 1
// 1 4 6 4 1

int factorial(int num)
{
    int fact = 1;
    if (num == 0)
    {
        return 1;
    }
    for (int i = num; i > 0; i--)
    {
        fact = fact * i;
    }
    return fact;
}
int NCR(int N, int R)
{
    int ans = factorial(N) / (factorial(N - R) * factorial(R));
    return ans;
}

int main()
{

    int N;
    cin >> N;

    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j <= i; j++)
        {
            cout<<NCR(i, j)<<" ";
        }
        cout<<endl;
    }

    return 0;
}