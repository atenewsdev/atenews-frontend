import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import FollowIcon from '@material-ui/icons/Add';
import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  container: {
  },
  account: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: 20,
    height: 65,
  },
  avatar: {
    height: 60,
    width: 60
  }
}));

export default function Page() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>University News - Atenews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h3">Ateneans ‘mostly dissatisfied’ with tuition fees, survey shows</Typography>
      <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>June 6, 2020</Typography>
      <Grid container direction="row" alignItems="center" spacing={2} style={{ marginTop: theme.spacing(1), width: 450 }}>
        <Grid item xs={2}>
          <Avatar className={classes.avatar}></Avatar>
        </Grid>
        <Grid container item direction="column" justify="center" spacing={1} xs={10}>
          <Grid item>
            <Typography variant="body1">Percival Cyber Vargas</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" size="small"><FollowIcon style={{ marginRight: theme.spacing(1) }} />Follow</Button>
          </Grid>
        </Grid>
      </Grid>
      <img src="https://atenews.ph/wp-content/uploads/2020/08/E245FF82-0C09-4A12-B48B-93CBF7987C82-2048x1536.jpeg" width="100%" style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Most college students of AdDU are not satisfied with the tuition fees, a recent survey by the SAMAHAN Research & Development department said Tuesday night.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Earning the lowest rating overall in the survey, ‘Tuition’ tallied 2.65 points in the 7-point Bipolar scale system, falling under ‘mostly dissatisfied’.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        It is also the lowest rated category in per cluster rating, falling under ‘mostly dissatisfied’ and ‘somewhat dissatisfied’.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Some clusters explicitly stated that the tuition fee is “too high” and should be reduced, for the students have no access to the facilities of the university.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        <b><i>Online classes satisfaction assessment</i></b>
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        With the grading system, students are ‘neither satisfied nor dissatisfied’ with 3.99 points.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        All clusters said that formative assessments should have a bearing to the final grade.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        In terms of the preparedness of professors, students are ‘somewhat satisfied’ with 4.54 points.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Professors must record their lectures and give tasks only during their time schedule, some clusters expressed.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Students are ‘neither satisfied nor dissatisfied’ with the preparedness of the university at 4 points.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Majority of the clusters said there must be a uniform online learning platform to be used.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        With regards to overall satisfaction, students are ‘somewhat satisfied’ with 4.47 points.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Students are ‘somewhat satisfied’ with the responsiveness of offices and student government with 5.19 points, the highest rating obtained both overall and per cluster rating.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        The said department conducted the survey from July 23 to August 3 via online with 511 student respondents.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Carlos Gue, the director of the said department, said that the conduct of the survey drew motivation from when Fr. Ulysses Cabayao, Assistant to the Academic Vice President for Online Education asked students to give their own suggestions on how online classes can be improved and how other concerns can be properly addressed during the 2nd SAMAHAN Townhall Conversation.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        Prompted by complaints from students, the research findings hope to provide information to the concerned offices and guide interventions.
      </Typography>
      <Typography variant="body1" component="p" style={{ marginTop: theme.spacing(2) }}>
        “Ang study is sana magamit ng SAMAHAN or mga Student Executive Councils sa dialogue,” he added.
      </Typography>

      <div style={{ height: theme.spacing(10) }} />

      
      <Divider />
      <Grid container>
        <Grid item xs={4}>
          <Button variant="text" color="primary" size="large" fullWidth><LikeIcon style={{ marginRight: theme.spacing(1) }} />192</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="text" color="primary" size="large" fullWidth><DislikeIcon style={{ marginRight: theme.spacing(1) }} />168</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="text" color="primary" size="large" fullWidth><ShareIcon style={{ marginRight: theme.spacing(1) }} />254</Button>
        </Grid>
      </Grid>
      <Divider />

    </div>
  )
}
