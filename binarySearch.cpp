#include<iostream>
#include<string.h>
using namespace std;

int binarySearch(int num,int A[]){
    int l = 0;
    int r = sizeof(A)/sizeof(A[0]);
    while( r >= l){
        int mid = (l+r)/2;

        if(num == A[mid]){
            return mid;
        }
        else if( num > A[mid]){
            l = mid+1;
        }
        else {
            r = mid-1;
        }
    }
    return -1;
    
}

int main(){

    int N;
    int A[10] = {12,13,14,100,121,140};
    cin>>N;
   
    if( binarySearch(N,A) == -1){
        cout<<"notFound"<<endl;
    }
    else{
        binarySearch(N,A);
    }



    return 0;   
}