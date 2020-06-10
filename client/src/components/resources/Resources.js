import React, { Component } from 'react';
import '../../css/Resources.css';
import Collapsible from './Collapsible';

class Resources extends Component {

    render() {
        return (
            <div className="Resources-container">
                <h1 style={{ marginBottom: "20px" }} class="header">Resources</h1>

                <Collapsible className="module-container"
                    title="How do drugs work on the brain?" paragraph={
                        <div>
                            <Collapsible className="module-container" title="Section 1"
                                paragraph={
                                    <div>
                                        <p> Drugs are chemicals. They work in the brain by tapping into the brain’s communication system and interfering with the way nerve cells of the brain normally send, receive, and process information.</p> <br />
                                        <p> Some drugs, such as marijuana and heroin, can increase the action of neurons because their chemical structure copies that of a natural neurotransmitter (chemical which allows messages to be sent in the brain). This similarity in structure “fools” receptors and allows the drugs to lock onto and activate the nerve cells. </p>
                                    </div>}>
                            </Collapsible>
                            <Collapsible className="module-container" title="Section 2"
                                paragraph={
                                    <div>
                                        <p> Although these drugs mimic brain chemicals, they don’t activate nerve cells in the exact same way as a neurotransmitter which we can produce normally in the body, and they lead to abnormal messages being transmitted through the network. </p> <br />
                                        <p> Other drugs, such as amphetamine or cocaine, can cause the nerve cells to release abnormally large amounts of natural neurotransmitters or prevent the normal recycling of these brain chemicals. This disruption produces a greatly amplified message, ultimately disrupting communication channels. The difference in effect can be described as the difference between someone whispering into your ear and someone shouting into a microphone. </p>
                                    </div>}>
                            </Collapsible>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Understanding Drugs"
                    paragraph={
                        <div>
                            <p><strong> Types of drugs: </strong></p>
                            <p> • Stimulants (Caffeine, Amphetamines, Meth, Cocaine, and Nicotine, as well as Ecstasy/ MDMA to some extent) </p>
                            <p> Causes an increase in breathing, blood pressure, heart rate, alertness, and mental activity
                            Works on the receptors for neurotransmitters: Dopamine (happiness), Serotonin (satisfaction), and Norepinephrine (excitement and fight-or-flight)
                        Most of all, increase dopamine </p>
                            <p> • Depressants (barbiturates, benzodiazepines, and alcohol, as well as marijuana to some degree) </p>
                            <p> Causes a decrease in blood pressure, heart rate, respiration, processing speed, reaction time. Slows down your movement and thinking. </p>
                            <p> • Opioids (Morphine, Heroin, Vicodin® and OxyContin®) </p>
                            <p> Causes a decrease in brain activity, heart rate, blood pressure
                            Analgesic (reduces pain)
                        Acts on endorphin receptors which reduce pain and increase dopamine </p>
                            <p> • Hallucinogens (LSD, Psilocybin/shrooms, and PCP) </p>
                            <p> Distorts perception, increases sensation, involves hallucinations
                        Can potentially increase or decrease energy and mood </p>
                            <p> • Nicotine is an addictive stimulant found in cigarettes and other forms of tobacco. Tobacco smoke increases a user’s risk of cancer, emphysema, and cardiovascular disease. The mortality rate (death rate) associated with tobacco addiction is incredibly high. Tobacco use kills at a rate of approximately 1,300 deaths a day. </p>
                            <p> • Alcohol consumption can damage the brain and nearly every organ in the human body irreversibly. Areas of the brain that are especially vulnerable to alcohol-related damage are the cerebral cortex (largely responsible for our higher brain functions, including problem solving and decision making), the hippocampus (important for memory and learning), and the cerebellum (important for movement coordination). This is why those who take in alcohol tend to have decreased memory, decision-making and coordination. </p>
                            <p> • Marijuana impairs short-term memory and learning, the ability to focus attention, and coordination. It also is an addictive substance which induces withdrawal symptoms. Effects include increased heart rate, lung damage, and increased risk of psychosis in patients with a predisposition. </p>
                            <p> • Inhalants are volatile substances found in many household products, such as oven cleaners, gasoline, spray paints, and other aerosols, that induce an altered mental state. Inhalants are extremely toxic and can damage organ systems in the body. Even a healthy person can suffer heart failure and death within minutes of a single prolonged inhalant session. </p>
                            <p> • Cocaine is a short-acting stimulant which requires frequent intake to maintain its effects. Cocaine is highly addictive and can lead to severe medical consequences related to the heart and the respiratory, and nervous systems. </p>
                            <p> • Amphetamines, including methamphetamine, are powerful stimulants that can produce feelings of euphoria and connectedness. Methamphetamine’s effects are particularly long-lasting and harmful to the brain. Amphetamines can cause high body temperature, dehydration, and, as a result, serious heart problems and seizures. </p>
                            <p> • Ecstasy (MDMA) produces both stimulant and hallucinogenic effects. It can increase body temperature, heart rate, blood pressure, and heart wall stress. Ecstasy may also be toxic to nerve cells. </p>
                            <p> • LSD is one of the most potent hallucinogenic, or perception altering, drugs. Its effects are unpredictable, and those who use it may encounter vivid visual, auditory and physical sensations. If taken excessively, users may feel shifts in senses for great lengths of time as well as lasting trauma. Use leads to increased body temperature, heart rate, and blood pressure, sweating, loss of appetite and sleeplessness </p>
                            <p> • Heroin is a very powerful opiate that produces euphoria and feelings of relaxation. It is highly addictive and can slows respiration to the point of death. Further, it is often linked to dangerous blood-borne illness through needles such as HIV. </p>
                            <p> • Steroids, which can also be prescribed for certain medical conditions, are abused to increase muscle mass and improve athletic performance despite it’s banned status by all competitive sports. Serious consequences of abuse can include severe acne, heart disease, liver problems, stroke, and depression. Males may experience shrinking of testacles, development of breasts, baldness, and decrease in sperm count while females may develop facial hair, deepened voice, and alterations in menstrual cycle. </p>
                            <p> • Drug combinations. Taking combinations of multiple drugs such as alcohol and nicotine or mixing mixing of prescription drugs which have dangerous and unpredictable effects for the user. </p>
                            <p> How do drugs make you feel good? </p>
                            <p> Most drugs take control of the brain’s reward system by increasing the amount of dopamine flooding the brain at a given point in time. Dopamine is a neurotransmitter present in regions of the brain that regulate movement, emotion, and feelings of pleasure. The overstimulation of this system produces euphoric effects. In turn, the brain anticipates and seeks additional stimulation of the same kind. </p>

                            <p> What happens if you take too many drugs? </p>
                            <p> Just as we turn down the volume on a radio that is too loud, the brain adjusts to the large amounts of dopamine (and other neurotransmitters which increase pleasure) by producing less dopamine or by blocking is ability to affect the brain. Imagine then, that as you flood your brain with more dopamine over time, it’s ability to affect your reward system gets slowly tuned out since your brain will keep decreasing the volume. The ability to experience any pleasure gets reduced. This is why someone using drugs might eventually feels flat, lifeless, and depressed, and is unable to enjoy things that previously brought them pleasure. Now, they need to take more and more drugs just to try and bring their function and happiness back up to normal. This is known as tolerance. </p>
                            <p> Just as continued use may lead to tolerance or the need for higher drug dosages to produce an effect, it may also lead to addiction, which can drive someone to seek out and take drugs without consideration for health consequences. </p>

                            <p> What are the medical consequences of drug use? </p>
                            <p> Those who tend to use or abuse drugs and those who suffer from addiction often have one or more accompanying medical issues. These issues may have existed prior to starting the use of the drug, may be the cause of its use (for example a chronic pain condition that requires opioids), or may develop due to addiction (for example organ degeneration or cancer). </p>
                            <p> Conditions which may exist alongside drug use can span stroke, cancer, mental disorders, and issues with respiratory and cardiac systems. As another example, tobacco has been strongly linked causes cancer of the mouth, throat, larynx, blood, lungs, stomach, pancreas, kidney, bladder, and cervix. In addition, some drugs are toxic to nerve cells and may damage or destroy them in the brain/nerves. </p>

                            <p> What are opioids? </p>
                            <p> Opioids are naturally found in the opium poppy plant. Some opioid medications are made from this plant while others are made by scientists in labs. Opioids have been used for hundreds of years to treat pain. </p>
                            <p> The most commonly used prescription opioids are oxycodone (OxyContin®), hydrocodone (Vicodin®), codeine, and morphine. Heroin is an opioid, but it is not a medication. Fentanyl is a powerful prescription pain reliever, but it is sometimes added to heroin by drug dealers, causing doses so strong that people may easily die from an overdose. </p>
                            <p> Note, there are an enormous amount of slang terms for opioids that are important to recognize including Roxy/oxy, Vikes, Percs, H, smack, dope, norco, and many more. </p>

                            <p> What is misuse? </p>
                            <p> Taking your prescription in ways other than instructed, mixing it with other drugs/alcohol, or taking it more often than is needed/prescribed for the purpose of getting a high. This can also entail taking your prescription less than instructed and saving them, selling them or giving them to others. Getting and using prescription pills from a friend or family member, even if it’s for a real medical condition. </p>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Understanding MAT"
                    paragraph={
                        <div>
                            <p style={{ backgroundColor: "#a351cb" }}><strong> What is MAT? </strong></p>
                            <p> Medication-assisted treatment, or MAT, is an evidence-based treatment for substance use disorders, including OUD. </p>
                            <p> Methadone, buprenorphine, and naltrexone are the three medications used for OUD. This treatment involves partial or full blockade of problematic opioid effects in the brain. Therefore, as the patient is slowly tapered off of their opioids, they also receive an MAT drug which reduces their withdrawal symptoms. Medication selection is based on the “whole-patient” approach. According to the American Society of Addiction Medicine, no matter which medication is selected, the goal is the same: getting the patient to feel normal, have little to no side effects or withdrawal symptoms, and have controlled cravings. </p>
                            <p> But MAT is not just medications and it is NOT replacing one drug with another. Acknowledging that MAT is often misunderstood as a medication-alone treatment for OUD, MAT prescribers point out that the Substance Abuse and Mental Health Services Administration (SAMHSA) specifically notes MAT is to be used “in combination with counseling and behavioral therapies, to provide a whole-patient  approach to the treatment of substance use disorders.” </p>

                            <p style={{ backgroundColor: "#a351cb" }}><strong> What are the different types of MAT drugs and what are their pros/cons? </strong></p>
                            <p> Different institutions may have access to only certain types of MAT drugs and so it is critical to understand the purpose each serves. </p>

                            <p style={{ backgroundColor: "#a351cb" }}><strong> Getting Sober: Can addiction be treated? </strong></p>
                            <p> Yes, as with any other chronic condition, addiction may be treated such that it no longer affects someone’s life in a negative manner. Treatment using a variety of means and with support allows people to completely regain control of their lives. </p>

                            <p style={{ backgroundColor: "#a351cb" }}><strong> What happens if I relapse? </strong></p>
                            <p> When a person uses alcohol or another drug after a long period of not using, they are having a relapse. </p>
                            <p> Here are some relapse warning signs: </p>
                            <p> Due to their success, the person believes that they no longer need to focus on their recovery effort; they are convinced they will never use again </p>
                            <p> Lack of self-care as they become exhausted from overwork, encounter difficult life situations or return to poor health habits in general </p>
                            <p> Increasing denial or return to denial. The person starts rationalizing, justifying, minimizing or generalizing negative thinking and behavior </p>
                            <p> Blaming others instead of taking personal responsibility for one's own thoughts, feelings or behavior </p>
                            <p> Being unable to accept feedback from others who are concerned or being unwilling to have conversations about their behavior </p>
                            <p> Isolation and attempting to solve problems on their own; not sharing what is going on with others in their support networks or leaving </p>
                            <p> Wanting too much too quickly or setting unrealistic goals and attempting to taper too quickly </p>
                            <p> It is important to understand that relapse is not a weakness and is a natural part of recovery, particularly in the earliest stages. It is good to recognize that relapse has occurred and that additional support may be needed in order to get over this speedbump. Let someone know about your relapse, whether it is a loved one or your care provider and ask for additional treatment/support. </p>

                            <p style={{ backgroundColor: "#a351cb" }}><strong> How does medication help with recovery? </strong></p>
                            <p> Different types of medications may be useful at different stages of treatment to help a patient stop abusing drugs, stay in treatment, and avoid relapse. </p>
                            <p> Treating Withdrawal. When patients first stop abusing drugs, they can experience a variety of physical and emotional symptoms, including depression, anxiety, and other mood disorders; restlessness; and sleeplessness. Certain treatment medications are designed to reduce these symptoms, which makes it easier to stop the abuse. </p>
                            <p> Staying in Treatment. Some treatment medications are used to help the brain adapt gradually to the absence of the abused drug. These medications act slowly to stave off drug cravings, and have a calming effect on body systems. They can help patients focus on counseling and other psychotherapies related to their drug treatment. </p>
                            <p> Preventing Relapse. Science has taught us that stress, cues linked to the drug experience (e.g., people, places, things, moods), and exposure to drugs are the most common triggers for relapse. Medications are being developed to interfere with these triggers to help patients sustain recovery. </p>

                            <p style={{ backgroundColor: "#a351cb" }}><strong> How does behavioral therapy help with recovery </strong></p>
                            <p> Behavioral treatments help engage people in drug abuse treatment, modifying their attitudes and behaviors related to drug abuse and increasing their life skills to handle stressful circumstances and environmental cues that may trigger intense craving for drugs and prompt another cycle of compulsive abuse. Moreover, behavioral therapies can enhance the effectiveness of medications and help people remain in treatment longer. </p>
                            <p> Cognitive Behavioral Therapy. Seeks to help patients recognize, avoid, and cope with situations in which they are most likely to abuse drugs. </p>
                            <p> Motivational Incentives. Uses positive reinforcement such as providing rewards or privileges for remaining drug free, for attending and participating in counseling sessions, or for taking treatment medications as prescribed. </p>
                            <p> Motivational Interviewing. Employs strategies to evoke rapid and internally motivated behavior change to stop drug use and facilitate treatment entry. </p>
                            <p> Group Therapy. Helps patients face their drug abuse realistically, come to terms with its harmful consequences, and boost their motivation to stay drug free. Patients learn effective ways to solve their emotional and interpersonal problems without resorting to drugs. </p>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Maintaining General Life"
                    paragraph={
                        <div>
                            <p style={{ backgroundColor: "#bba151" }}><strong> If taking drugs makes me happier what is the problem? </strong></p>
                            <p> At first, people may perceive what seem to be positive effects with drug use. They also may believe that they can control their use; however, drugs can quickly take over their lives. </p>
                            <p> Consider how a social drinker can become intoxicated, put himself behind the wheel and quickly turn a pleasurable activity into a tragedy for him and others. Over time, if drug use continues, pleasurable activities become less pleasurable, and drug abuse becomes necessary for abusers to simply feel “normal.” Drug abusers reach a point where they seek and take drugs, despite the tremendous problems caused for themselves and their loved ones. Some individuals may start to feel the need to take higher or more frequent doses, even in the early stages of their drug use </p>

                            <p style={{ backgroundColor: "#bba151" }}><strong> Why do some people get addicted and others don’t? </strong></p>
                            <p> Biological factors </p>
                            <p> Scientists estimate that genetic factors account for between 40 and 60 percent of a person’s vulnerability to addiction, including the effects of environment on gene expression and function. Adolescents and individuals with mental disorders are at greater risk of drug abuse and addiction than the general population. </p>
                            <p> Environmental factors </p>
                            <p> Home and Family. The influence of the home environment is usually most important in childhood. Parents or older family members who abuse alcohol or drugs or who engage in criminal behavior can increase children’s risks of developing their own drug problems. </p>
                            <p> Peer and School. Friends and acquaintances have the greatest influence during adolescence. Drug-abusing peers can sway even those without risk factors to try drugs for the first time. Academic failure or poor social skills can put a child further at risk for drug abuse. </p>
                            <p> Other factors </p>
                            <p> Early Use. Although taking drugs at any age can lead to addiction, research shows that the earlier a person begins to use drugs the more likely they are to progress to more serious abuse. This may reflect the harmful effect that drugs can have on the developing brain; it also may result from a constellation of early biological and social vulnerability factors, including genetic susceptibility, mental illness, unstable family relationships, and exposure to physical or sexual abuse. Still, the fact remains that early use is a strong indicator of problems ahead, among them, substance abuse and addiction. </p>
                            <p> Method of Administration. Smoking a drug or injecting it into a vein increases its addictive potential. Both smoked and injected drugs enter the brain within seconds, producing a powerful rush of pleasure. However, this intense “high” can fade within a few minutes, taking the abuser down to lower, more normal levels. It is a starkly felt contrast, and scientists believe that this low feeling drives individuals to repeated drug abuse in an attempt to recapture the high pleasurable state. </p>

                            <p style={{ backgroundColor: "#bba151" }}><strong> How does addiction affect other people in my life? </strong></p>
                            <p> Negative effects of prenatal drug exposure on infants and children. </p>
                            <p> It is likely that some drug-exposed children will need educational support in the classroom to help them overcome what may be subtle deficits in developmental areas such as behavior, attention, and cognition. Ongoing work is investigating whether the effects of prenatal exposure on brain and behavior extend into adolescence to cause developmental problems during that time period. </p>
                            <p> Increased spread of infectious diseases. </p>
                            <p> Injection of drugs such as heroin, cocaine, and methamphetamine accounts for more than a third of new AIDS cases. Injection drug use is also a major factor in the spread of hepatitis C, a serious, potentially fatal liver disease. Injection drug use is not the only way that drug abuse contributes to the spread of infectious diseases. All drugs of abuse cause some form of intoxication, which interferes with judgment and increases the likelihood of risky sexual behaviors. This, in turn, contributes to the spread of HIV/AIDS, hepatitis B and C, and other sexually transmitted diseases. </p>


                            <p style={{ backgroundColor: "#bba151" }}><strong> How to talk to people about my recovery? </strong></p>
                            <p> Broadly speaking, it may be challenging for you to speak to others about your experience with recovery and your decision to pursue MAT. Decide what to share with people based upon your relationship with them. If you feel that an individual may not be willing to support you in your journey then it may be in your best interest at this stage to distance yourself from these “friends” </p>
                            <p> Trust develops over time. Depending on your comfort level with people you can decide what makes sense.  Also, thinking about how you will respond to people ahead of time will help. </p>
                            <p> For instance, if someone you know from work asks about where you have been, consider stating that you had some health related problems and leaving it at that. Most people will then ask if you are ok, at which point you can say, "Yes, thank you," and change the subject. Some people may just choose to say, "I had some personal issues." If you decide to say this, the person may still wonder what was going on but will usually not ask any further questions. Even though you may feel anxious or even pressured in some way–it is ok to not discuss personal information about yourself with others and this can be good recovery practice in setting appropriate boundaries. </p>


                            <p style={{ backgroundColor: "#bba151" }}><strong> Problems with sleep </strong></p>
                            <p> There is a period of readjustment around sleep in early recovery. Sleep patterns need time to return to normal. It generally takes a bit longer to fall asleep. This is especially true if you were previously using alcohol or sedative drugs during the day or before bed. To reduce your sleep problems, develop a regular sleep schedule. Plan for as close to 8 hours as you can. Do not watch television or read in bed. Do not use caffeine in the afternoon or evening (this includes coffee, soda and chocolate). Drink milk or herbal tea. Don't exercise or involve yourself in strenuous mental activity before bed. Try a warm bath. Don't go to bed hungry or after eating a large meal. Do not nap during the day–this will just compound your difficulties. Also, Melatonin is a hormone that is naturally produced in the brain. It helps regulate sleep cycles and has been shown to be a safe dietary supplement. You can buy it without a prescription from health food stores, drug stores and on the Internet. As with any medication or supplement, consult with a health professional about this. If the problem persists, check with your doctor. You might benefit from other sleep medications with low or no addiction potential. </p>

                            <p style={{ backgroundColor: "#bba151" }}><strong> Loneliness </strong></p>
                            <p> Feeling lonely is very common when a person first stops using drugs. So you are definitely not alone in this regard. Many people who stop using drugs or alcohol miss the friends they used to use with. Missing them and feeling lonely is normal. Remember, it takes time to develop a new social network. </p>
                            <p> Here are a few things to think about as a way to deal with feeling lonely: </p>
                            <p> Are there people you know who do not use drugs and who you grew apart from due to your using? If so, this might be a good time to try to reconnect with them. You can even acknowledge that you grew apart due to your drug use, but that you are abstinent now and would love to see them. Family members can also be good people to reconnect with if you have family around. There may even be people at work who you might attempt to get to know on a more social level. </p>
                            <p> Have you been attending any self-help meetings such as NA or SMART Recovery? Meetings are a great place to meet other people who are in the same place as you are. That is, they are also trying to no longer drink and use drugs, and have also probably separated themselves from many past friends and acquaintances. If you haven't checked out any meetings, you could consider this. </p>
                            <p> Get involved in fun activities that may have an interest for you. You will meet new people with similar interests. Over time, you may be able to develop some social relationships with them. </p>
                            <p> Remember that your feelings are normal. It takes time to develop new friends and a new social support system. Give it time and you will eventually develop new friends. </p>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Building Community Support"
                    paragraph={
                        <div>
                            <p> Triggers </p>
                            <p> Wanting to get high is normal and a common reason for relapse. Triggers include things in your environment, friends you used to drink and use with, boredom, and loneliness. Physical pain, depression, and anxiety can trigger a relapse. </p>
                            <p> When you feel that you encountered a trigger and have a desire to use -- instead think it through. The feeling inspired by the trigger will pass even if you do not use and instead you should focus on what thoughts caused you to associate a trigger with using. What were you thinking that lead you to believe that using was the best thing for you at that time? Focus on understanding that thought pattern so that next time you start to feel bored, alone, etc. you know that it is only transitory and is not worth relapsing for. </p>
                            <p> In addition to letting the feeling decrease on its own, think about your environment. Are you triggered to use when you pass a location which you used to hang out at? Or when you are performing an activity which creates a mental association with drug use instead think about other activities which can distract your or you find entertaining. Get involved with that activity, exercise, call a friend/family, request advice etc. </p>
                            <p> What if I have been in rehab before? </p>
                            <p> This means you have already learned many of the skills needed to recover from addiction and should try it again.  Relapse should not discourage you. Relapse rates with addiction are similar to rates for other chronic diseases many people live with, such as hypertension, diabetes, and asthma. Treatment of chronic diseases involves changing deeply imbedded behaviors, and relapse sometimes goes with the territory—it does not mean treatment failed. A return to drug abuse indicates that treatment needs to be started again or adjusted, or that you might benefit from a different approach. </p>

                            <p> How can I talk to others with similar problems? </p>
                            <p> Self-help groups can extend the effects of professional treatment. The most well-known self-help groups are those affiliated with Alcoholics Anonymous (AA), Narcotics Anonymous (NA), and Cocaine Anonymous (CA), all of which are based on the 12-step model. Most drug addiction treatment programs encourage patients to participate in a self-help group during and after formal treatment. These groups can be particularly helpful during recovery, as they are a source of ongoing communal support to stay drug free. Support groups for family members of people with addictions, like Al-anon or Alateen, can also be helpful. </p>
                            <p> There are other groups in the private sector that can provide a lot of support. To find other meetings in your area, contact local hospitals, treatment centers, or faith-based organizations. </p>

                            <p> People have told me I shouldn't use drugs and drive, but I feel fine when driving. Can I trust my judgment on driving? </p>
                            <p> The most responsible thing you can do is stop driving while using drugs. This can be inconvenient, but it will show loved ones you are serious about getting better.  Specific drugs act differently on the brain, but all impair skills necessary for the safe operation of a vehicle. These include motor skills, balance and coordination, perception, attention, reaction time, and judgment. Even small amounts of some drugs can have measurable effects on driving ability. Drugs also impact your ability to tell if you are impaired, so you should not trust your own judgment on driving until you receive an evaluation and treatment. For more, see our DrugFacts on drugged driving. </p>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Understanding Addiction"
                    paragraph={
                        <div>
                            <p> Can addiction be treated successfully? </p>
                            <p> Yes, addiction is a treatable disorder. Research on the science of addiction and the treatment of substance use disorders has led to the development of research-based methods that help people to stop using drugs and resume productive lives, also known as being in recovery. </p>
                            <p> Can addiction be cured? </p>
                            <p> Like other chronic diseases such as heart disease or asthma, treatment for drug addiction usually isn't a cure. But addiction can be managed successfully. Treatment enables people to counteract addiction's disruptive effects on their brain and behavior and regain control of their lives. </p>

                            <p> Does relapse to drug use mean treatment has failed? </p>
                            <p> No. The chronic nature of addiction means that for some people relapse, or a return to drug use after an attempt to stop, can be part of the process, but newer treatments are designed to help with relapse prevention. Relapse rates for drug use are similar to rates for other chronic medical illnesses. If people stop following their medical treatment plan, they are likely to relapse. </p>
                            <p> Treatment of chronic diseases involves changing deeply rooted behaviors, and relapse doesn’t mean treatment has failed. When a person recovering from an addiction relapses, it indicates that the person needs to speak with their doctor to resume treatment, modify it, or try another treatment.52 </p>
                            <p> While relapse is a normal part of recovery, for some drugs, it can be very dangerous—even deadly. If a person uses as much of the drug as they did before quitting, they can easily overdose because their bodies are no longer adapted to their previous level of drug exposure. An overdose happens when the person uses enough of a drug to produce uncomfortable feelings, life-threatening symptoms, or death. </p>

                            <p> What are the principles of effective treatment? </p>
                            <p> Research shows that when treating addictions to opioids (prescription pain relievers or drugs like heroin or fentanyl), medication should be the first line of treatment, usually combined with some form of behavioral therapy or counseling. Medications are also available to help treat addiction to alcohol and nicotine. </p>
                            <p> Additionally, medications are used to help people detoxify from drugs, although detoxification is not the same as treatment and is not sufficient to help a person recover. Detoxification alone without subsequent treatment generally leads to resumption of drug use. </p>
                            <p> For people with addictions to drugs like stimulants or cannabis, no medications are currently available to assist in treatment, so treatment consists of behavioral therapies. Treatment should be tailored to address each patient's drug use patterns and drug-related medical, mental, and social problems. </p>

                            <p> What medications and devices help treat drug addiction? </p>
                            <p> Different types of medications may be useful at different stages of treatment to help a patient stop abusing drugs, stay in treatment, and avoid relapse. </p>
                            <p> Treating withdrawal. When patients first stop using drugs, they can experience various physical and emotional symptoms, including restlessness or sleeplessness, as well as depression, anxiety, and other mental health conditions. Certain treatment medications and devices reduce these symptoms, which makes it easier to stop the drug use. </p>
                            <p> Staying in treatment. Some treatment medications and mobile applications are used to help the brain adapt gradually to the absence of the drug. These treatments act slowly to help prevent drug cravings and have a calming effect on body systems. They can help patients focus on counseling and other psychotherapies related to their drug treatment. </p>
                            <p> Preventing relapse. Science has taught us that stress cues linked to the drug use (such as people, places, things, and moods), and contact with drugs are the most common triggers for relapse. Scientists have been developing therapies to interfere with these triggers to help patients stay in recovery. </p>

                            <p> How do behavioral therapies treat drug addiction? </p>
                            <p> Behavioral therapies help people in drug addiction treatment modify their attitudes and behaviors related to drug use. As a result, patients are able to handle stressful situations and various triggers that might cause another relapse. Behavioral therapies can also enhance the effectiveness of medications and help people remain in treatment longer. </p>
                            <p> Cognitive-behavioral therapy seeks to help patients recognize, avoid, and cope with the situations in which they're most likely to use drugs. </p>
                            <p> Contingency management uses positive reinforcement such as providing rewards or privileges for remaining drugfree, for attending and participating in counseling sessions, or for taking treatment medications as prescribed. </p>
                            <p> Motivational enhancement therapy uses strategies to make the most of people's readiness to change their behavior and enter treatment. </p>
                            <p> Family therapy helps people (especially young people) with drug use problems, as well as their families, address influences on drug use patterns and improve overall family functioning. </p>
                            <p> Twelve-step facilitation (TSF) is an individual therapy typically delivered in 12 weekly session to prepare people to become engaged in 12-step mutual support programs. 12-step programs, like Alcoholic Anonymous, are not medical treatments, but provide social and complementary support to those treatments. TSF follows the 12-step themes of acceptance, surrender, and active involvement in recovery. </p>

                            <p> https://www.drugabuse.gov/publications/drugs-brains-behavior-science-addiction/drug-misuse-addiction </p>
                            <p> What is drug addiction? </p>
                            <p> Addiction is defined as a chronic, relapsing disorder characterized by compulsive drug seeking and use despite adverse consequences.† It is considered a brain disorder, because it involves functional changes to brain circuits involved in reward, stress, and self-control, and those changes may last a long time after a person has stopped taking drugs.11 </p>
                            <p> Addiction is a lot like other diseases, such as heart disease. Both disrupt the normal, healthy functioning of an organ in the body, both have serious harmful effects, and both are, in many cases, preventable and treatable. If left untreated, they can last a lifetime and may lead to death. </p>
                            <p> Why do people take drugs? </p>
                            <p> In general, people take drugs for a few reasons: </p>
                            <p> To feel good. Drugs can produce intense feelings of pleasure. This initial euphoria is followed by other effects, which differ with the type of drug used. For example, with stimulants such as cocaine, the high is followed by feelings of power, self-confidence, and increased energy. In contrast, the euphoria caused by opioids such as heroin is followed by feelings of relaxation and satisfaction. </p>
                            <p> To feel better. Some people who suffer from social anxiety, stress, and depression start using drugs to try to feel less anxious. Stress can play a major role in starting and continuing drug use as well as relapse (return to drug use) in patients recovering from addiction. </p>
                            <p> To do better. Some people feel pressure to improve their focus in school or at work or their abilities in sports. This can play a role in trying or continuing to use drugs, such as prescription stimulants or cocaine. </p>
                            <p> Curiosity and social pressure. In this respect, teens are particularly at risk because peer pressure can be very strong. Teens are more likely than adults to act in risky or daring ways to impress their friends and show their independence from parents and social rules. </p>
                            <p> If taking drugs makes people feel good or better, what's the problem? When they first use a drug, people may perceive what seem to be positive effects. They also may believe they can control their use. But drugs can quickly take over a person's life. Over time, if drug use continues, other pleasurable activities become less pleasurable, and the person has to take the drug just to feel “normal.” They have a hard time controlling their need to take drugs even though it causes many problems for themselves and their loved ones. Some people may start to feel the need to take more of a drug or take it more often, even in the early stages of their drug use. These are the telltale signs of an addiction.Even relatively moderate drug use poses dangers. Consider how a social drinker can become intoxicated, get behind the wheel of a car, and quickly turn a pleasurable activity into a tragedy that affects many lives. Occasional drug use, such as misusing an opioid to get high, can have similarly disastrous effects, including overdose, and dangerously impaired driving. </p>
                            <p> Do people freely choose to keep using drugs? </p>
                            <p> The initial decision to take drugs is typically voluntary. But with continued use, a person's ability to exert self-control can become seriously impaired; this impairment in self-control is the hallmark of addiction. </p>
                            <p> Brain imaging studies of people with addiction show physical changes in areas of the brain that are critical to judgment, decision-making, learning and memory, and behavior control.12 These changes help explain the compulsive nature of addiction. </p>
                            <p> No single factor determines whether a person will become addicted to drugs. </p>
                            <p> As with other diseases and disorders, the likelihood of developing an addiction differs from person to person, and no single factor determines whether a person will become addicted to drugs. In general, the more risk factors a person has, the greater the chance that taking drugs will lead to drug use and addiction. Protective factors, on the other hand, reduce a person's risk. Risk and protective factors may be either environmental or biological. </p>
                            <p> Biological factors that can affect a person's risk of addiction include their genes, stage of development, and even gender or ethnicity. Scientists estimate that genes, including the effects environmental factors have on a person's gene expression, called epigenetics, account for between 40 and 60 percent of a person's risk of addiction.27 Also, teens and people with mental disorders are at greater risk of drug use and addiction than others.28 </p>
                            <p> What environmental factors increase the risk of addiction? </p>
                            <p> Children's earliest interactions within the family are crucial to their healthy development and risk for drug use. </p>
                            <p> Environmental factors are those related to the family, school, and neighborhood. Factors that can increase a person's risk include the following: </p>
                            <p> Home and Family. The home environment, especially during childhood, is a very important factor. Parents or older family members who use drugs or misuse alcohol, or who break the law, can increase children's risk of future drug problems.29 </p>
                            <p> What other factors increase the risk of addiction? </p>
                            <p> Early Use. Although taking drugs at any age can lead to addiction, research shows that the earlier a person begins to use drugs, the more likely he or she is to develop serious problems.31 This may be due to the harmful effect that drugs can have on the developing brain.32 It also may result from a mix of early social and biological risk factors, including lack of a stable home or family, exposure to physical or sexual abuse, genes, or mental illness. Still, the fact remains that early use is a strong indicator of problems ahead, including addiction. </p>
                            <p> How the drug is taken. Smoking a drug or injecting it into a vein increases its addictive potential.33,34 Both smoked and injected drugs enter the brain within seconds, producing a powerful rush of pleasure. However, this intense high can fade within a few minutes. Scientists believe this starkly felt contrast drives some people to repeated drug taking in an attempt to recapture the fleeting pleasurable state.</p>
                        </div>
                    }></Collapsible>
                <Collapsible className="module-container"
                    title="Opioid Safety Checklist"
                    paragraph={
                        <div>
                            <p> Opioid Safety Checklist </p>
                            <p> Take the opioid medicine exactly as prescribed. Don't take more of the medicine than prescribed. Don't take the medicine more often than prescribed. </p>
                            <p> Don't take any other medication unless you check with your health care provider or pharmacist first. </p>
                            <p> Do not drink alcohol while taking the opioid medicine. It can lead to serious medical problems, even death. </p>
                            <p> Do not drive, ride a bike, or operate machinery while taking the medicine because the medicine can make you sleepy. </p>
                            <p> Do not take opioid medication if you are or may be pregnant. It can cause serious problems in a baby. </p>
                            <p> Do not share your medication with anyone. </p>
                            <p> Have a parent or trusted caregiver: </p>
                            <p> Store the opioids in a locked cabinet away from children, friends, and visitors. </p>
                            <p> Keep track of how much medicine is in the container so you know if someone else is taking the medicine. </p>
                            <p> Safely dispose of any leftover opioids as soon as you no longer need them. </p>
                            <p> What Opioid Pain Medicines Are Prescribed for Kids and Teens? </p>
                            <p> Opioid pain medicines prescribed for children and teens include: </p>
                            <p> hydrocodone with acetaminophen liquid (Hycet®) and pills (Vicodin® and Lortab®) </p>
                            <p> oxycodone with acetaminophen liquid (Roxicet®) and pills (Percocet®) </p>
                            <p> hydromorphone liquid and pills (Dilaudid®) </p>
                            <p> morphine liquid and pills </p>
                            <p> oxycodone liquid and pills </p>
                            <p> others — your health care provider may prescribe an opioid pain medicine that is not on this list </p>
                            <p> What Are the Risks of Opioid Pain Medicines? </p>
                            <p> If you take an opioid pain medicine for a few days, you might notice side effects like sleepiness, constipation, itching, and stomach upset. When opioids are taken as directed, these side effects may be annoying, but are not dangerous. </p>
                            <p> Taking opioids for longer brings other risks, including: </p>
                            <p> developing a tolerance (needing more opioid for the same pain relief) </p>
                            <p> physical dependence (having symptoms of withdrawal when the opioid is stopped) </p>
                            <p> addiction (when someone has very strong cravings and will continue to take an opioid even when it causes problems with health, relationships, and money) </p>
                            <p> Taking too much of an opioid or mixing it with other drugs and/or alcohol can lead to overdose and death. </p>
                            <p> Could I Become Addicted to Opioids? </p>
                            <p> Most kids and teens who take opioids for a short time as instructed by a health care provider do not get addicted. For example, a teen who has surgery or a broken bone and takes an opioid as directed is very unlikely to become addicted. But taking more of the medicine or taking it for longer than prescribed increases your chances of becoming addicted. </p>
                            <p> Sharing this medicine with others puts them at risk for addiction or overdose. Do not share your medicine with anyone. </p>
                            <p> What Happens When Someone Is Addicted? </p>
                            <p> Someone addicted to opioids will want to get more when the prescription runs out. This can lead to inappropriate or risky behavior, such as lying to a health care provider to get a new prescription, buying opioids from a friend, stealing opioids from friends or family, or buying and using street drugs (such as heroin). </p>
                            <p> Why Do We Need to Lock Up the Opioids? </p>
                            <p> Sometimes people take opioids prescribed for someone else. For example, a teen might take a younger sibling's medicine or someone might take a friend's opioid to manage pain, anxiety, or sleep problems. They might think that prescription opioid medicines are safer than street drugs because health care providers prescribe them. </p>
                            <p> But prescription opioids can lead to severe side effects, dependence, addiction, and overdose. Keeping the opioids locked up will help make sure that only person they were prescribed for takes them. </p>
                            <p> How Do We Safely Dispose of Unused Medicine? </p>
                            <p> As soon as you're done taking the medicine, your parent or caregiver should get rid of any unused medicine. Ask your healthcare provider or pharmacist how to get rid of extra medicine safely. They may recommend that you flush the medicine, mix it with coffee grounds and then throw it away, or take it to a drug take-back program. The FDA has more information. </p>
                        </div>
                    }></Collapsible>

            </div >
        );
    }
}

export default Resources;