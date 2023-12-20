#include<stdio.h>

int r(){
 int static num=7;
 printf("%d", num);
 return num--;
}

int main() {
    
 for(r();r();r()) {
  printf("%d ",r());
  };
  
 return 0;
}