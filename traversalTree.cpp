#include<iostream>
using namespace std;

struct Node {
    Node * left;
    Node * right;
    int val;

    Node(int data){
        val = data;
        left = NULL;
        right = NULL;
    }
};

void postorder( struct Node * &root){
        if(root == NULL) return ;
        postorder(root->left);
        postorder(root->right);
        cout<<root->val<<" ";
}

        //         1
        //      /    \
        //      2      3
        //      / \    / \
        //      4 5    6  7

void preorder( struct Node * &root){
    if(root == NULL) return ;
    cout<<root->val<<" ";
    preorder( root-> left);
    preorder( root-> right);
}

void inorder( struct Node * &root){
    if( root == NULL) return;
    inorder( root->left);
    cout<<root->val<<" ";
    inorder( root->right);
}

int main(){

    struct Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);                  

    root->left->left = new Node(4);
    root->left->right = new Node(5);

    root->right->left = new Node(6);
    root->right->right = new Node(7);

    // postorder(root);
    // preorder(root);
    inorder(root);

    return 0;
}