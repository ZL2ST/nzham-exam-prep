import { Page, Image, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  topContainer: {
    paddingTop: "60px",
    textAlign: 'center',
    paddingBottom: '10px'
  },
  container: {
    paddingTop: "30px",
    paddingLeft: '60px',
    paddingRight: '60px'
  },
  containerBottom: {
    paddingTop: "10px",
    paddingLeft: '60px',
    paddingRight: '60px'
  },
  textTop: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    paddingBottom: "12px",
  },
  textHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    paddingBottom: "12px",
  },
  textBody: {
    fontSize: 11,
    fontFamily: "Helvetica",
    paddingBottom: "10px",
  },
  textList: {
    fontSize: 11,
    fontFamily: "Helvetica",
    paddingBottom: "5px",
    paddingLeft: '15px'
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  watermarkImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});

const Watermark = ({ src }) => (
  <View style={styles.watermarkContainer}>
    <Image src={src} style={styles.watermarkImage} />
  </View>
);

const PDFCoverPage = () => {
  return (
    <Page size="A4" style={styles.page}>
      <Watermark src="nzart-wm.png" />
      <View style={styles.topContainer}>
        <Text style={styles.textTop}>
          New Zealand Association of Radio Transmitters Inc.
        </Text>
        <Text style={styles.textTop}>
          Amateur Radio Examination:
        </Text>
        <Text style={styles.textTop}>
          Regulations and Theory.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textHeading}>
          Please read these instructions carefully.
        </Text>
        <Text style={styles.textHeading}>
          Do not open this question paper to commence the examination until the Exam Supervisor permits.
        </Text>
        <Text style={styles.textHeading}>
          Before the Examination
        </Text>
        <Text style={styles.textBody}>
          You will have been issued with an answer sheet. Please clearly print your name at the top of the sheet. 
          If you have any queries, please consult the Exam Supervisors present.
        </Text>
        <Text style={styles.textHeading}>
          Examination Instructions
        </Text>
        <Text style={styles.textList}>
          1. The time limit for this examination is two hours. You may not need all this time, and you may leave 
          the examination (quietly) at any time.
        </Text>
        <Text style={styles.textList}>
          2. This examination has sixty questions. Answer all sixty on the answer sheet provided. A pass 
          requires forty correct answers.
        </Text>
        <Text style={styles.textList}>
          3. Each question has four optional answers. Only ONE will be correct.
        </Text>
        <Text style={styles.textList}>
          4. Answer each question by drawing a clear cross over the letter option on the 
          answer sheet that you think is correct.
        </Text>
        <Text style={styles.textList}>
          5. If you wish to change your answer, draw a line through all four options and write the letter 
          designating your new answer in the space to the right of the options.
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.textBody}>
          This examination question paper is yours to take away with you from the examination if you wish. 
          Your answer sheet remains the property of the NZART.
        </Text>
        <Text style={styles.textBody}>
          If you have any complaint about this examination or the examination procedure, you should write 
          formally to
        </Text>
        <Text style={styles.textBody}>
          The NZART Examination Co-ordinator{"\n"}
          PO Box 40525{"\n"}
          Upper Hutt 5140
        </Text>
      </View>
    </Page>
  )
};

export default PDFCoverPage;
