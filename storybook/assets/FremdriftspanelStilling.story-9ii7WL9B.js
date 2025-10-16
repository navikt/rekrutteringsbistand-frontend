import{ax as I,ay as w,j as t,R as k,S as x,c7 as j,cy as y,c9 as g,cK as u,aL as b,cL as _}from"./iframe-CZslivju.js";import{w as d,c as D}from"./ContextDecorators-7QCaWgPx.js";import{F as N,A as v}from"./FullførtStilling-YPkFh85i.js";import{R as T}from"./GjenåpneStillingKnapp-K-c79GEU.js";import{T as A}from"./TilgangskontrollForInnhold-Hy1GH4M1.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgD67gQc.js";import"./OrganisasjonsnummerAlert-CD_DayHm.js";import"./VStack-DUBo_edV.js";import"./BasePrimitive-DUfdo9kL.js";import"./List-D7ixjuyg.js";import"./Link-D8FWDtoI.js";import"./KandidatHendelseTag-BySAcDuD.js";import"./Tag-Dfqld2iL.js";import"./FileXMark-XX9tD0kF.js";import"./Trash-MyCCBKoW.js";import"./HandShakeHeart-CiRqeagj.js";import"./Calendar-DiwF2yQv.js";import"./ThumbUp-DGjIwcjH.js";import"./Table-Jk6u2ME4.js";import"./util-IQ18lRMy.js";import"./format-DMpFMWtq.js";import"./match-BT5f6T_9.js";import"./parse-Ct7n3oJ2.js";import"./getDefaultOptions-CtUMiAib.js";import"./parseISO-B7rV6_4O.js";import"./util-axHo5kBG.js";import"./accordion-DzybSPa-.js";import"./index-BN0_tQYY.js";import"./index-CRB7CiS_.js";import"./index-Dee350W9.js";import"./ChevronDown-DG95zFN3.js";import"./Box-DaZSnmM8.js";import"./Bell-CUuNMeIP.js";import"./PersonChat-BzZWE2EF.js";import"./Eye-CPWUGujU.js";import"./ProgressBar-Dlf-pu8h.js";import"./EyeSlash-BTZ9BFTJ.js";import"./CircleSlash-CqCfX0M9.js";import"./Modal-CUJSlshC.js";import"./floating-ui.react-DbYvyV8k.js";import"./Date.Input-B88OqUWr.js";import"./useFormField-DlnxwSY_.js";import"./useControllableState-jtcIfYop.js";import"./Modal.context-BtgAVPDG.js";import"./Checkbox-BVf788ps.js";import"./Fieldset-C91H1PfT.js";import"./Pencil-ByHsKdKJ.js";import"./PersonbrukerTekst-DFb1A0dw.js";import"./ClockDashed-Ddkry0gd.js";import"./Tasklist-CDgZOCSh.js";import"./ErrorBoundary-gfP_h_Xg.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
