import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-BovJDKCI.js";import{w as m,c as A}from"./ContextDecorators-B3aKcPYD.js";import{F as N,A as v}from"./FullførtStilling-K5vxZI3N.js";import{R as T}from"./GjenåpneStillingKnapp-DgLTxR4F.js";import{T as E}from"./TilgangskontrollForInnhold-DQOZr_vi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C-Dx5kZ7.js";import"./OrganisasjonsnummerAlert-C4zHqR64.js";import"./VStack-D0AMLDXW.js";import"./BasePrimitive-BAxo2HmN.js";import"./List-7fyXgRE7.js";import"./Link-ClZLbEY_.js";import"./KandidatHendelseTag-C1qTQJ1v.js";import"./Tag-66WObbC1.js";import"./ChatExclamationmark-PLiAFIos.js";import"./FileXMark-CMhkvzRw.js";import"./Trash-C73CBX-Y.js";import"./HandShakeHeart-D4l4aMNW.js";import"./Calendar-DBuloJTq.js";import"./ThumbUp-wYJMbsDb.js";import"./Table-BNJX2O-z.js";import"./util-CUxBDTGI.js";import"./parse-BgrplRoJ.js";import"./getDefaultOptions-DK2iPdcc.js";import"./parseISO-C4snc2Vp.js";import"./index-CWVRmJSY.js";import"./index-B40KJ5b4.js";import"./isBefore-9mWIkaPW.js";import"./util-CVUTdVUi.js";import"./accordion-JQlh3wof.js";import"./index-BQ230AgU.js";import"./index-Da937aAH.js";import"./index-Dx3dWe2Q.js";import"./ChevronDown-CJWPnQMx.js";import"./Box-BWsJGKEV.js";import"./Bell-BFPNFtnk.js";import"./PersonChat-D7ypM_lx.js";import"./Eye-CkAQG9GT.js";import"./ProgressBar-hti4jZDL.js";import"./EyeSlash-BXy2lKWu.js";import"./CircleSlash-BUMjZTNF.js";import"./Modal-BS1wt9c9.js";import"./floating-ui.react-DZFgd5ZI.js";import"./Date.Input-ewhvnWIO.js";import"./useFormField-BNZ4k9l9.js";import"./useControllableState-Cohy2CnX.js";import"./Modal.context-Dd1l30yo.js";import"./Checkbox-CSa1XwJ7.js";import"./Fieldset-CZeVvHWr.js";import"./Pencil-Uq0QM0B0.js";import"./PersonbrukerTekst-CXL3Scu_.js";import"./ClockDashed-B9TYYYk7.js";import"./Tasklist-Dq2r5Wen.js";import"./ErrorBoundary-D7oLLjK-.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
