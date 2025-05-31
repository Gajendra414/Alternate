package expo.modules.callerid.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "caller_info")
data class CallerEntity(
    @PrimaryKey
    val phoneNumber: String,
    val countryCode: String,
    val name: String,
    val appointment: String,
    val city: String,
    val iosRow: String
)
