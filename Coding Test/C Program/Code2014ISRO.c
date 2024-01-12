#include<stdio.h>
float i=2.0;
float j=1.0;
float sum=0.0;
main(){
    while (i/j>0.001)
    {
        printf("%f\n",j);
        j+=j;
        // printf("%f\n",j+=j);
        sum=sum+(i/j);
        // printf("%f\n", sum);
    }
}