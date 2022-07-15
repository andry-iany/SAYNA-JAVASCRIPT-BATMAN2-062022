const imagesWithPosition = [
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_3.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_4.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_5.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_6.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_7.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_8.png",
            },
            {
                position: "bottom-left",
                src: "/assets/illustrations/game/Batgame_9.png",
            },
            {
                position: "bottom-right",
                src: "/assets/illustrations/game/Batgame_9-1.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_10.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_11.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_12.png",
            },
            {
                position: "bottom-center",
                src: "/assets/illustrations/game/Batgame_13.png",
            },
            {
                position: "bottom-left",
                src: "/assets/illustrations/game/Batgame_13-1.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_14.png",
            },
            {
                position: "top-center",
                src: "/assets/illustrations/game/Batgame_15.png",
            },
            {
                position: "bottom-center",
                src: "/assets/illustrations/game/Batgame_16.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_17.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_18.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_19.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_20.png",
            },
        ],
    },
    {
        images: [
            {
                position: "top-left",
                src: "/assets/illustrations/game/Batgame_21.png",
            },
        ],
    },
];
export function ImageFactory() {
    let currentImageIndex = 0;
    return () => imagesWithPosition[currentImageIndex++ % imagesWithPosition.length];
}
