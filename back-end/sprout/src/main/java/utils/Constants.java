package utils;

public final class Constants {
	//TODO replace "SproutDatabase" in the following to whatever the schema will be named and update the username and password
	//public static final String dbAddress = "jdbc:mysql://localhost/SproutDatabase?user=root&password=root@";
	public static final String dbAddress = "jdbc:mysql:///sproutCSCI201?cloudSqlInstance=leafy-garden-309901:europe-west4:sprout-201&socketFactory=com.google.cloud.sql.mysql.SocketFactory&user=root&password=root";

	public static final String googleClientId = "467227431315-qfa0plniiro21687j2ifupq82cd7j6op.apps.googleusercontent.com";

	public static final String origins = "http://localhost:3000";

	public static final int discoverPageBusinessLimit = 10;

}
