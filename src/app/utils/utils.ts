export class Utils {

    public static getFechaActual(): any{
        return new Date().toISOString().slice(0, 10);;
    }

}