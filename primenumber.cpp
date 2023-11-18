#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int num){
    for( int i = 2; i < num ; i++){
        if(num % i == 0 ){
            return false;
        }
    }
    return true;
}

int main()
{

    int N1, N2;
    cin >> N1 >> N2;

    for (int i = N1; i < N2; i++){
        if(isPrime(i)){
            cout<<i<<endl;
        }
    }

    return 0;
}