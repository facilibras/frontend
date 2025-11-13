interface RootCardProps {
   children?: React.ReactNode;
}

export const RootCard = ({ children }: RootCardProps) => {
    return (
        <div className="transition-all hover:-translate-y-1 duration-300 bg-white rounded-xl shadow-md overflow-hidden">
            {children}
        </div>
    );
};
