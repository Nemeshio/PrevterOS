function Color(cmd){
    args = cmd.split(" ");
    // if (args[1] == "-b" || args[1] == "--background") {
    // }
    if (args.length == 1)
        Write("\r\nCurrent color is: " + fillColor.toString());
    else if (args.length == 2){
        fillColor = color(int(args[1]));
        Write("\r\nSet color to: " + fillColor.toString());
    }
    else if (args.length == 3){
        fillColor = color(int(args[1]), int(args[2]));
        Write("\r\nSet color to: " + fillColor.toString());
    }
    else if (args.length == 4){
        fillColor = color(int(args[1]), int(args[2]), int(args[3]));
        Write("\r\nSet color to: " + fillColor.toString());
    }
    else if (args.length == 5){
        fillColor = color(int(args[1]), int(args[2]), int(args[3]), int(args[4]));
        Write("\r\nSet color to: " + fillColor.toString());
    }
    else
        Write("\r\nToo many arguments!");
}