// Calculate Fine
const Issue = require("../model/issue");
const User = require("../model/user");

exports.CalculateFine = async () => {
    // Finding User's issues which had passed the returned date
    const issues = await Issue.aggregate()
        .match({
            returned: false,
            return_date: {
                $lt: new Date(Date.now())
            }
        })
        .group({
            _id: {
                user:"$user"
            },
            dates: {
                $push: {
                    return_date:"$return_date"
                }
            }
        });
    // console.log(issues);

    for (let issue of issues){
        let fine = 0;
        // Calculate Fine
        for (let date of issue.dates){
            let return_delay = Math.ceil((Date.now()-date.return_date)/(24 * 60 * 60 * 1000));
            fine += return_delay*10;
        }
        // Updating fine in user
        const user = await User.findOne({_id:issue._id.user})
            .catch(err => console.log(err));
        if (!user){
            continue;
        }
        user.violationFlag=true;
        user.fine=fine;
        await user.save().catch(err => console.log(err));
    }
};
