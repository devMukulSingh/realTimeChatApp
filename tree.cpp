#include<iostream>
using namespace std;

struct Node{
    Node * left;
    Node * right;
    int val;
    Node(int data){
        val = data;
    }
};

int main(){

    struct Node *root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);  

    return 0;
}