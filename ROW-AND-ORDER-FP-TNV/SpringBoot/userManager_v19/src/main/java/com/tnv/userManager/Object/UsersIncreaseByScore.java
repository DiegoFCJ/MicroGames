package com.tnv.userManager.Object;

        import com.tnv.userManager.model.User;

        import java.util.Comparator;

public class UsersIncreaseByScore implements Comparator<User> {

    @Override
    public int compare(User o1, User o2) {
        int r = 0;

        if (o1.getScore() > o2.getScore()) {
            r = +1;
        } else if (o1.getScore() < o2.getScore()) {
            r = -1;
        }
        return r;
    }
}