import{aL as w,Q as I,j as t,w as k,S as j,cz as x,cH as b,cG as g,cA as u,W as y,cW as _}from"./iframe-CRS9-BOb.js";import{w as m,c as D}from"./ContextDecorators-DwQy2Jy1.js";import{F as N,A as v}from"./FullførtStilling-CeBMlPX8.js";import{R as T}from"./GjenåpneStillingKnapp-CA59MhUr.js";import{T as A}from"./TilgangskontrollForInnhold-9eG0VKiy.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D4h0_DKz.js";import"./OrganisasjonsnummerAlert-Bd5Ejc0y.js";import"./VStack-BQQ0dKEz.js";import"./BasePrimitive-CY8eNV0L.js";import"./List-ihX-omU2.js";import"./Link-BTd5oh5y.js";import"./KandidatHendelseTag-Rh3zxDTn.js";import"./Tag-B2ouINeh.js";import"./ChatExclamationmark-Dml3K2Fe.js";import"./FileXMark-BOLQeMt1.js";import"./Trash-1RhOzARE.js";import"./HandShakeHeart-Do0phbpB.js";import"./Calendar-pLAFrJG6.js";import"./ThumbUp-D44t2_t2.js";import"./Table-DUGu0A95.js";import"./dato-BFDiICoh.js";import"./parse-BtgZcLmZ.js";import"./getDefaultOptions-BkkzbRik.js";import"./parseISO-CHQBiHwP.js";import"./index-D8LHKCF-.js";import"./index-B40KJ5b4.js";import"./util-B_iAsHCp.js";import"./DatoVelger-BVizcmjt.js";import"./useDatepicker-BHu0fhn6.js";import"./useControllableState-CwJC9U2H.js";import"./Modal-BI8ix8Oc.js";import"./floating-ui.react-CCOU2mDb.js";import"./Date.Input-Cyj1nMxI.js";import"./useFormField--7ahSM5x.js";import"./ChevronDown-1rzHA3pA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DUMsSXDZ.js";import"./Modal.context-CAhttf3V.js";import"./Popover-lS-5hZGv.js";import"./DismissableLayer-jHTTirOe.js";import"./startOfMonth-J6H3zy4S.js";import"./Select-DMhxSUpr.js";import"./endOfMonth-C7JEmgv1.js";import"./ArrowLeft-B7QOVjeM.js";import"./ArrowRight-BepMOrKJ.js";import"./isSameDay-CtOE4Ec1.js";import"./Checkbox-CwPCQ7Yq.js";import"./Fieldset-BzIyeV7F.js";import"./accordion-ChKmT1Ef.js";import"./index-qVdNo8RX.js";import"./index-BmB1yckS.js";import"./index-DPj0rjzZ.js";import"./Box-ju1jJ9nB.js";import"./Bell-CMzKJtC_.js";import"./PersonChat-BGbdP9fQ.js";import"./Eye-D0crwqtv.js";import"./ProgressBar-CbpldPYF.js";import"./useLatestRef-D_1YJXEW.js";import"./EyeSlash-BO7Biq5r.js";import"./CircleSlash-Bc3k7dky.js";import"./Pencil-ChUWkpC_.js";import"./PersonbrukerTekst-DqSXDQ65.js";import"./ClockDashed-d8JIhbG2.js";import"./Tasklist-C2pebkXt.js";import"./ErrorBoundary-DPXrEQ6W.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
