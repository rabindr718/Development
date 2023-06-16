import java.util.*;
public class ReverseOrder {
    public static void main(String[] args) {

        Integer[]array={4,5,5,7687,9,6,7,43,1,14};
        Arrays.sort(array, Collections.reverseOrder());
        String iterarteValue=Arrays.toString(array);
        System.out.println( "This is Reverse Order : "+iterarteValue);

    }
}
