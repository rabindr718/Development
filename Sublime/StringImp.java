import java.util.Collections;
import java.util.Arrays;


public class StringImp {
    public static void main(String[] args) {
        Character arr[]={'A', 'B', 'C','D','E'};
        Arrays.sort(arr, Collections.reverseOrder());
        String ar=Arrays.toString(arr);
        System.out.print(  " "+ar);

    }
}
