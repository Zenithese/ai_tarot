import {
    useState
} from 'react';
import './App.css';

export const tarotDeck = [
    {
        id: 0,
        name: 'The Fool',
        arcana: 'major',
        meanings: {
            upright: 'Beginnings, innocence, spontaneity, a free spirit',
            reversed: 'Naivety, recklessness, risk-taking, being taken advantage of',
        },
    },
    {
        id: 1,
        name: 'The Magician',
        arcana: 'major',
        meanings: {
            upright:
                'Manifestation, resourcefulness, power, inspired action',
            reversed: 'Manipulation, poor planning, untapped talents, insecurity',
        },
    },
    {
        id: 2,
        name: 'The High Priestess',
        arcana: 'major',
        meanings: {
            upright:
                'Intuition, sacred knowledge, divine feminine, the subconscious mind',
            reversed: 'Secrets, disconnected from intuition, withdrawal and silence',
        },
    },
    {
        id: 3,
        name: 'The Empress',
        arcana: 'major',
        meanings: {
            upright: 'Femininity, beauty, nature, nurturing, abundance',
            reversed: 'Creative block, dependence on others, emptiness, infertility',
        },
    },
    {
        id: 4,
        name: 'The Emperor',
        arcana: 'major',
        meanings: {
            upright: 'Authority, establishment, structure, a father figure, power',
            reversed: 'Tyranny, rigidity, coldness, abuse of power',
        },
    },
    {
        id: 5,
        name: 'The Hierophant',
        arcana: 'major',
        meanings: {
            upright: 'Tradition, conformity, morality, ethics, spirituality',
            reversed: 'Rebellion, subversiveness, new approaches, iconoclasm',
        },
    },
    {
        id: 6,
        name: 'The Lovers',
        arcana: 'major',
        meanings: {
            upright: 'Love, harmony, relationships, values alignment, choices',
            reversed: 'Self-love, disharmony, imbalance, misalignment of values',
        },
    },
    {
        id: 7,
        name: 'The Chariot',
        arcana: 'major',
        meanings: {
            upright: 'Control, willpower, success, action, determination',
            reversed: 'Lack of control and direction, aggression, defeat',
        },
    },
    {
        id: 8,
        name: 'Strength',
        arcana: 'major',
        meanings: {
            upright: 'Inner strength, bravery, compassion, focus, patience',
            reversed: 'Self-doubt, weakness, insecurity, lack of self-discipline',
        },
    },
    {
        id: 9,
        name: 'The Hermit',
        arcana: 'major',
        meanings: {
            upright:
                'Contemplation, search for truth, inner guidance, solitude, withdrawal',
            reversed: 'Isolation, loneliness, withdrawal, misanthropy',
        },
    },
    {
        id: 10,
        name: 'Wheel of Fortune',
        arcana: 'major',
        meanings: {
            upright: 'Good luck, karma, life cycles, destiny, a turning point',
            reversed: 'Bad luck, negative external forces, out of control',
        },
    },
    {
        id: 11,
        name: 'Justice',
        arcana: 'major',
        meanings: {
            upright:
                'Justice, fairness, truth, cause and effect, law',
            reversed: 'Unfairness, lack of accountability, dishonesty',
        },
    },
    {
        id: 12,
        name: 'The Hanged Man',
        arcana: 'major',
        meanings: {
            upright: 'Surrender, new perspective, enlightenment, letting go',
            reversed: 'Stubbornness, refusal to see other viewpoints, delaying',
        },
    },
    {
        id: 13,
        name: 'Death',
        arcana: 'major',
        meanings: {
            upright: 'Endings, change, transformation, transition',
            reversed: 'Resistance to change, inability to move on, stagnation',
        },
    },
    {
        id: 14,
        name: 'Temperance',
        arcana: 'major',
        meanings: {
            upright: 'Balance, moderation, patience, purpose',
            reversed: 'Imbalance, excess, lack of long-term vision',
        },
    },
    {
        id: 15,
        name: 'The Devil',
        arcana: 'major',
        meanings: {
            upright: 'Shadow self, attachment, addiction, restriction, sexuality',
            reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
        },
    },
    {
        id: 16,
        name: 'The Tower',
        arcana: 'major',
        meanings: {
            upright: 'Sudden upheaval, broken pride, disaster, revelation',
            reversed: 'Disaster avoided, delayed disaster, fear of suffering',
        },
    },
    {
        id: 17,
        name: 'The Star',
        arcana: 'major',
        meanings: {
            upright: 'Hope, faith, purpose, renewal, spirituality',
            reversed: 'Lack of faith, despair, discouragement, insecurity',
        },
    },
    {
        id: 18,
        name: 'The Moon',
        arcana: 'major',
        meanings: {
            upright: 'Unconscious, illusions, intuition, the unknown',
            reversed: 'Release of fear, repressed emotion, inner confusion',
        },
    },
    {
        id: 19,
        name: 'The Sun',
        arcana: 'major',
        meanings: {
            upright: 'Joy, success, celebration, positivity, vitality',
            reversed: 'Inner child, feeling down, overly optimistic',
        },
    },
    {
        id: 20,
        name: 'Judgment',
        arcana: 'major',
        meanings: {
            upright: 'Judgment, rebirth, inner calling, absolution',
            reversed: 'Self-doubt, refusal of self-examination, inner critic',
        },
    },
    {
        id: 21,
        name: 'The World',
        arcana: 'major',
        meanings: {
            upright: 'Completion, integration, accomplishment, travel',
            reversed: 'Lack of completion, lack of closure',
        },
    },
    {
        id: 22,
        name: 'Ace of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Inspiration, new opportunities, growth, potential',
            reversed: 'Delays, missed opportunities, lack of direction',
        },
    },
    {
        id: 23,
        name: 'Two of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Future planning, progress, decisions, discovery',
            reversed: 'Lack of planning, disorganization, fear of unknown',
        },
    },
    {
        id: 24,
        name: 'Three of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Expansion, progress, foresight, overseas opportunities',
            reversed: 'Lack of foresight, obstacles, delays',
        },
    },
    {
        id: 25,
        name: 'Four of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Celebration, harmony, marriage, home, community',
            reversed: 'Disunity, miscommunication, instability, relocation',
        },
    },
    {
        id: 26,
        name: 'Five of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Competition, disagreements, tension, conflict',
            reversed: 'Avoidance of conflict, respect, agreement, mediation',
        },
    },
    {
        id: 27,
        name: 'Six of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Victory, public recognition, progress, self-confidence',
            reversed: 'Egotism, self-doubt, opposition, lack of recognition',
        },
    },
    {
        id: 28,
        name: 'Seven of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Perseverance, defending oneself, maintaining control',
            reversed: 'Giving up, overwhelmed, self-doubt, yielding',
        },
    },
    {
        id: 29,
        name: 'Eight of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Speed, action, movement, air travel, quick decisions',
            reversed: 'Delays, frustration, miscommunication, ignoring opportunities',
        },
    },
    {
        id: 30,
        name: 'Nine of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Resilience, courage, persistence, test of faith',
            reversed: 'Stagnation, cowardice, exhaustion, giving up',
        },
    },
    {
        id: 31,
        name: 'Ten of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Burden, responsibility, hard work, completion, accomplishment',
            reversed: 'Inability to delegate, overstressed, burnt out, lack of results',
        },
    },
    {
        id: 32,
        name: 'Page of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Inspiration, ideas, discovery, limitless potential',
            reversed: 'Setbacks, lack of direction, insecurity, frustration',
        },
    },
    {
        id: 33,
        name: 'Knight of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Energy, passion, inspired action, adventure, impulsiveness',
            reversed: 'Hasty decisions, impulsiveness, delays, frustration',
        },
    },
    {
        id: 34,
        name: 'Queen of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Courage, determination, joy, vibrancy, radiance',
            reversed: 'Selfishness, jealousy, insecurities, dependency',
        },
    },
    {
        id: 35,
        name: 'King of Wands',
        arcana: 'minor',
        meanings: {
            upright: 'Natural-born leader, vision, entrepreneur, honour, fiery',
            reversed: 'Impulsiveness, haste, ruthless, high expectations',
        },
    },
    {
        id: 36,
        name: 'Ace of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Emotional fulfillment, joy, new relationships, creativity',
            reversed: 'Blocked creativity, emotional loss, emptiness, broken relationships',
        },
    },
    {
        id: 37,
        name: 'Two of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Unified love, partnership, attraction, romantic idealism',
            reversed: 'Broken relationships, emotional imbalance, codependency',
        },
    },
    {
        id: 38,
        name: 'Three of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Celebration, friendship, creativity, collaborations, community',
            reversed: 'Lack of friendships, isolation, overindulgence, disconnection',
        },
    },
    {
        id: 39,
        name: 'Four of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Apathy, contemplation, disconnectedness, re-evaluation',
            reversed: 'Boredom, missed opportunity, being aloof, apathy',
        },
    },
    {
        id: 40,
        name: 'Five of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Loss, grief, self-pity, disappointment',
            reversed: 'Acceptance, forgiveness, moving on, finding peace',
        },
    },
    {
        id: 41,
        name: 'Six of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Revisiting the past, childhood memories, innocence, joy',
            reversed: 'Nostalgia, naivety, unrealistic expectations, being stuck in the past',
        },
    },
    {
        id: 42,
        name: 'Seven of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Fantasy, illusion, wishful thinking, choices, opportunities',
            reversed: 'Overwhelmed, too many choices, lost in fantasy, confusion',
        },
    },
    {
        id: 43,
        name: 'Eight of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Walking away, disillusionment, leaving behind, following dreams',
            reversed: 'Fear of the unknown, fear of change, holding on, unfinished business',
        },
    },
    {
        id: 44,
        name: 'Nine of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Happiness, satisfaction, contentment, emotional stability',
            reversed: 'Inner happiness, materialism, dissatisfaction, greed',
        },
    },
    {
        id: 45,
        name: 'Ten of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Divine love, harmony, fulfillment, happiness, joy',
            reversed: 'Broken relationships, disharmony, unfulfillment, disconnection',
        },
    },
    {
        id: 46,
        name: 'Page of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Inspiration, creativity, new beginnings, new opportunities',
            reversed: 'Creative blocks, emotional immaturity, creative burnout',
        },
    },
    {
        id: 47,
        name: 'Knight of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Romantic, imaginative, thoughtful, sensitivity, refined',
            reversed: 'Moodiness, disappointment, unfulfilled promises, emotional manipulator',
        },
    },
    {
        id: 48,
        name: 'Queen of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Compassionate, nurturing, intuitive, empathetic, sensitive',
            reversed: 'Martyrdom, emotional insecurity, emotional manipulator, smothering',
        },
    },
    {
        id: 49,
        name: 'King of Cups',
        arcana: 'minor',
        meanings: {
            upright: 'Compassionate, calm, balanced, diplomatic, mature',
            reversed: 'Emotional instability, mood swings, emotional manipulation, lost in emotion',
        },
    },
    {
        id: 50,
        name: 'Ace of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'New ideas, mental clarity, success, break-throughs, new beginning',
            reversed: 'Confusion, chaos, mental block, lack of clarity',
        },
    },
    {
        id: 51,
        name: 'Two of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Difficult choices, indecision, stalemate, truce',
            reversed: 'No-win situations, confusion, information overload',
        },
    },
    {
        id: 52,
        name: 'Three of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Heartbreak, emotional pain, sorrow, grief',
            reversed: 'Recovery, forgiveness, emotional healing, moving on',
        },
    },
    {
        id: 53,
        name: 'Four of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Rest, recuperation, relaxation, meditation',
            reversed: 'Exhaustion, burnout, stress, need for relaxation',
        },
    },
    {
        id: 54,
        name: 'Five of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Defeat, betrayal, conflict, dishonor',
            reversed: 'Reconciliation, making amends, release, forgiveness',
        },
    },
    {
        id: 55,
        name: 'Six of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Transition, change, moving on, leaving behind',
            reversed: 'Stuck, emotional baggage, resistance to change, inability to move on',
        },
    },
    {
        id: 56,
        name: 'Seven of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Deception, betrayal, cunning, strategy, breaking free',
            reversed: 'Confession, exposure, getting caught, accepting consequences',
        },
    },
    {
        id: 57,
        name: 'Eight of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Self-victimization, self-imposed isolation, imprisonment',
            reversed: 'Self-acceptance, releasing victim mentality, breaking free',
        },
    },
    {
        id: 58,
        name: 'Nine of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Nightmare, despair, fear, anxiety, depression',
            reversed: 'Hopelessness, releasing fear, facing anxiety, inner turmoil',
        },
    },
    {
        id: 59,
        name: 'Ten of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Painful endings, deep wounds, betrayal, loss',
            reversed: 'Recovery, regeneration, fear of pain, resisting endings',
        },
    },
    {
        id: 60,
        name: 'Page of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Curiosity, mental agility, new ideas, thirst for knowledge',
            reversed: 'Narrow-mindedness, self-righteousness, mental confusion',
        },
    },
    {
        id: 61,
        name: 'Knight of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Ambition, drive, passion, fast-thinking, high energy',
            reversed: 'Anger, aggression, impulsive, hot-headed',
        },
    },
    {
        id: 62,
        name: 'Queen of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Intelligence, independence, wisdom, sharp mind, honesty',
            reversed: 'Cold-heartedness, bitterness, dishonesty, overly critical',
        },
    },
    {
        id: 63,
        name: 'King of Swords',
        arcana: 'minor',
        meanings: {
            upright: 'Truth, justice, intellectual power, authority, leadership',
            reversed: 'Manipulation, tyranny, cold-heartedness, abuse of power',
        },
    },
    {
        id: 64,
        name: 'Ace of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'New financial opportunities, prosperity, abundance, manifestation',
            reversed: 'Lost opportunity, lack of planning, scarcity, financial issues',
        },
    },
    {
        id: 65,
        name: 'Two of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Balance, flexibility, adaptability, time management',
            reversed: 'Imbalance, disorganization, lack of flexibility, inability to manage time',
        },
    },
    {
        id: 66,
        name: 'Three of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Collaboration, teamwork, learning, mastery, skill-building',
            reversed: 'Dissension, lack of teamwork, competition, inferior work',
        },
    },
    {
        id: 67,
        name: 'Four of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Security, stability, conservatism, hoarding',
            reversed: 'Greed, materialism, obsession, scarcity mentality',
        },
    },
    {
        id: 68,
        name: 'Five of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Poverty, insecurity, financial loss, isolation',
            reversed: 'Recovery, positive changes, finding help, spiritual growth',
        },
    },
    {
        id: 69,
        name: 'Six of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Charity, generosity, sharing, giving, receiving',
            reversed: 'Debt, selfishness, greed, withholding',
        },
    },
    {
        id: 70,
        name: 'Seven of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Hard work, perseverance, diligence, patience, waiting',
            reversed: 'Work without results, distractions, lack of rewards, impatience',
        },
    },
    {
        id: 71,
        name: 'Eight of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Dedication, apprenticeship, hard work, quality, diligence',
            reversed: 'Perfectionism, workaholism, lack of motivation, poor workmanship',
        },
    },
    {
        id: 72,
        name: 'Nine of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Abundance, luxury, self-sufficiency, financial independence',
            reversed: 'Financial instabilities, self-worth tied to wealth, over-indulgence',
        },
    },
    {
        id: 73,
        name: 'Ten of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Legacy, inheritance, family, financial security, permanence',
            reversed: 'Financial failure, disinheritance, family problems, loss of home',
        },
    },
    {
        id: 74,
        name: 'Page of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Opportunity, curiosity, new beginnings, manifestation, skill-building',
            reversed: 'Lack of progress, procrastination, lacking skills, lack of direction',
        },
    },
    {
        id: 75,
        name: 'Knight of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Dependability, diligence, hard work, responsibility, productivity',
            reversed: 'Boredom, feeling stuck, laziness, neglecting responsibilities',
        },
    },
    {
        id: 76,
        name: 'Queen of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Nurturing, practical, domestic, motherly, down-to-earth',
            reversed: 'Codependency, smothering, self-neglect, focus on materialism',
        },
    },
    {
        id: 77,
        name: 'King of Pentacles',
        arcana: 'minor',
        meanings: {
            upright: 'Abundance, prosperity, security, generosity, discipline, leadership',
            reversed: 'Greed, materialism, over-indulgence, bad investments, risky business',
        },
    },
];

export const images = {
    TheFool: '/images/1909_PAM_A/the_fool.jpg',
    TheMagician: '/images/1909_PAM_A/the_magician.jpg',
    TheHighPriestess: '/images/1909_PAM_A/the_high_priestess.jpg',
    TheEmpress: '/images/1909_PAM_A/the_empress.jpg',
    TheEmperor: '/images/1909_PAM_A/the_emperor.jpg',
    TheHierophant: '/images/1909_PAM_A/the_hierophant.jpg',
    TheLovers: '/images/1909_PAM_A/the_lovers.jpg',
    TheChariot: '/images/1909_PAM_A/the_chariot.jpg',
    Strength: '/images/1909_PAM_A/strength.jpg',
    TheHermit: '/images/1909_PAM_A/the_hermit.jpg',
    WheelOfFortune: '/images/1909_PAM_A/wheel_of_fortune.jpg',
    Justice: '/images/1909_PAM_A/justice.jpg',
    TheHangedMan: '/images/1909_PAM_A/the_hanged_man.jpg',
    Death: '/images/1909_PAM_A/death.jpg',
    Temperance: '/images/1909_PAM_A/temperance.jpg',
    TheDevil: '/images/1909_PAM_A/the_devil.jpg',
    TheTower: '/images/1909_PAM_A/the_tower.jpg',
    TheStar: '/images/1909_PAM_A/the_star.jpg',
    TheMoon: '/images/1909_PAM_A/the_moon.jpg',
    TheSun: '/images/1909_PAM_A/the_sun.jpg',
    Judgment: '/images/1909_PAM_A/judgment.jpg',
    TheWorld: '/images/1909_PAM_A/the_world.jpg',

    AceOfWands: '/images/1909_PAM_A/ace_of_wands.jpg',
    TwoOfWands: '/images/1909_PAM_A/two_of_wands.jpg',
    ThreeOfWands: '/images/1909_PAM_A/three_of_wands.jpg',
    FourOfWands: '/images/1909_PAM_A/four_of_wands.jpg',
    FiveOfWands: '/images/1909_PAM_A/five_of_wands.jpg',
    SixOfWands: '/images/1909_PAM_A/six_of_wands.jpg',
    SevenOfWands: '/images/1909_PAM_A/seven_of_wands.jpg',
    EightOfWands: '/images/1909_PAM_A/eight_of_wands.jpg',
    NineOfWands: '/images/1909_PAM_A/nine_of_wands.jpg',
    TenOfWands: '/images/1909_PAM_A/ten_of_wands.jpg',
    PageOfWands: '/images/1909_PAM_A/page_of_wands.jpg',
    KnightOfWands: '/images/1909_PAM_A/knight_of_wands.jpg',
    QueenOfWands: '/images/1909_PAM_A/queen_of_wands.jpg',
    KingOfWands: '/images/1909_PAM_A/king_of_wands.jpg',

    AceOfCups: '/images/1909_PAM_A/ace_of_cups.jpg',
    TwoOfCups: '/images/1909_PAM_A/two_of_cups.jpg',
    ThreeOfCups: '/images/1909_PAM_A/three_of_cups.jpg',
    FourOfCups: '/images/1909_PAM_A/four_of_cups.jpg',
    FiveOfCups: '/images/1909_PAM_A/five_of_cups.jpg',
    SixOfCups: '/images/1909_PAM_A/six_of_cups.jpg',
    SevenOfCups: '/images/1909_PAM_A/seven_of_cups.jpg',
    EightOfCups: '/images/1909_PAM_A/eight_of_cups.jpg',
    NineOfCups: '/images/1909_PAM_A/nine_of_cups.jpg',
    TenOfCups: '/images/1909_PAM_A/ten_of_cups.jpg',
    PageOfCups: '/images/1909_PAM_A/page_of_cups.jpg',
    KnightOfCups: '/images/1909_PAM_A/knight_of_cups.jpg',
    QueenOfCups: '/images/1909_PAM_A/queen_of_cups.jpg',
    KingOfCups: '/images/1909_PAM_A/king_of_cups.jpg',

    AceOfSwords: '/images/1909_PAM_A/ace_of_swords.jpg',
    TwoOfSwords: '/images/1909_PAM_A/two_of_swords.jpg',
    ThreeOfSwords: '/images/1909_PAM_A/three_of_swords.jpg',
    FourOfSwords: '/images/1909_PAM_A/four_of_swords.jpg',
    FiveOfSwords: '/images/1909_PAM_A/five_of_swords.jpg',
    SixOfSwords: '/images/1909_PAM_A/six_of_swords.jpg',
    SevenOfSwords: '/images/1909_PAM_A/seven_of_swords.jpg',
    EightOfSwords: '/images/1909_PAM_A/eight_of_swords.jpg',
    NineOfSwords: '/images/1909_PAM_A/nine_of_swords.jpg',
    TenOfSwords: '/images/1909_PAM_A/ten_of_swords.jpg',
    PageOfSwords: '/images/1909_PAM_A/page_of_swords.jpg',
    KnightOfSwords: '/images/1909_PAM_A/knight_of_swords.jpg',
    QueenOfSwords: '/images/1909_PAM_A/queen_of_swords.jpg',
    KingOfSwords: '/images/1909_PAM_A/king_of_swords.jpg',

    AceOfPentacles: '/images/1909_PAM_A/ace_of_pentacles.jpg',
    TwoOfPentacles: '/images/1909_PAM_A/two_of_pentacles.jpg',
    ThreeOfPentacles: '/images/1909_PAM_A/three_of_pentacles.jpg',
    FourOfPentacles: '/images/1909_PAM_A/four_of_pentacles.jpg',
    FiveOfPentacles: '/images/1909_PAM_A/five_of_pentacles.jpg',
    SixOfPentacles: '/images/1909_PAM_A/six_of_pentacles.jpg',
    SevenOfPentacles: '/images/1909_PAM_A/seven_of_pentacles.jpg',
    EightOfPentacles: '/images/1909_PAM_A/eight_of_pentacles.jpg',
    NineOfPentacles: '/images/1909_PAM_A/nine_of_pentacles.jpg',
    TenOfPentacles: '/images/1909_PAM_A/ten_of_pentacles.jpg',
    PageOfPentacles: '/images/1909_PAM_A/page_of_pentacles.jpg',
    KnightOfPentacles: '/images/1909_PAM_A/knight_of_pentacles.jpg',
    QueenOfPentacles: '/images/1909_PAM_A/queen_of_pentacles.jpg',
    KingOfPentacles: '/images/1909_PAM_A/king_of_pentacles.jpg',
};




