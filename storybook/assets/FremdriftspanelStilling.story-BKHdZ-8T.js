import{j as t,e as k}from"./iframe-DUxtTNxK.js";import{w as m,c as D}from"./ContextDecorators-0GWS18bU.js";import{K as I}from"./schema.zod-BcVu7MdB.js";import{u as w}from"./useKandidatlisteForEier-ux_mSMYH.js";import{a as j}from"./StillingsContext-DwxaThtx.js";import{R as T,F as x,A as b}from"./FullførtStilling-DvAzykqo.js";import{K as g,I as y}from"./KandidatTyper-CkRsvxsW.js";import{a as _}from"./stilling-typer-DLlwa7NU.js";import{S as N}from"./SWRLaster-ahx2Fy0D.js";import{T as A}from"./TilgangskontrollForInnhold-W-EIz6hs.js";import{m as u,a as v}from"./stillingMock-BrGQ3Dix.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-tMH_2NXv.js";import"./OrganisasjonsnummerAlert-Kw2WDzWd.js";import"./VStack-DoqecrzT.js";import"./BasePrimitive-B-03YwKR.js";import"./List-BlNWY6Ar.js";import"./Link-CRlAhKkl.js";import"./KandidatHendelseTag-C7GaS2LG.js";import"./Tag-CGXWCvcz.js";import"./FileXMark-BLSijq_W.js";import"./Trash-DrCBaZmc.js";import"./HandShakeHeart-SYpfDfcJ.js";import"./Calendar-vRZG72bU.js";import"./ThumbUp-D1MY7-bL.js";import"./Table-Cgf_c-8B.js";import"./util-B3kSclT_.js";import"./format-Co7MPrtN.js";import"./startOfDay-lTP3GKUn.js";import"./match-tiuZ8ZDo.js";import"./parseISO-DJIM71K9.js";import"./parse-B-xC80nj.js";import"./getDefaultOptions-QtkovLFY.js";import"./util-DOP1jEkD.js";import"./kandidat.mock-F3wnuv6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./index-FAu4VCGm.js";import"./index-BB9gl3jm.js";import"./index-0HEPybu3.js";import"./stilling.dto-Bw9Mbzio.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./oppdaterStilling-CGjw38AS.js";import"./Box-Cboms74W.js";import"./EyeSlash-CZYAoO5z.js";import"./CircleSlash-DzZxKPx8.js";import"./Modal-DyHa_SWt.js";import"./floating-ui.react-B3fQZbcy.js";import"./Date.Input-Vql_antk.js";import"./useFormField-QnfnlfxN.js";import"./useControllableState-BZbvvCv1.js";import"./ChevronDown-D9_c06q4.js";import"./Modal.context-DCuskc3o.js";import"./Checkbox-Odq9MjXC.js";import"./Fieldset-CdQ2lEJI.js";import"./Pencil-D93FhzCl.js";import"./ClockDashed-CAYgBk_P.js";import"./PersonChat-DWmpHXb6.js";import"./Tasklist-Bi4lLpeb.js";import"./accordion-KEQOCilP.js";import"./index-CxYERlKX.js";import"./index-DtWvQqBv.js";import"./index-dgmNyMJM.js";import"./Bell-T75WqU3S.js";import"./Eye-BZdcS0yT.js";import"./ProgressBar-BUQOVuIF.js";import"./Feilmelding-BvwgHkOs.js";import"./CopyButton-mlBszqul.js";import"./Checkmark-3br_GopI.js";import"./Sidelaster-Cl1Akhnj.js";import"./ErrorBoundary-CgpCiwMU.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=j(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(N,{hooks:[d],children:e=>{const F=e.status===I.Lukket&&i.stilling.status===_.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+R;return F?t.jsx(x,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(b,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const ti={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=v,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,ti as default};
